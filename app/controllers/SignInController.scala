package controllers

import akka.http.scaladsl.model.HttpHeader.ParsingResult.Ok
import authentication.forms.SignInForm
import authentication.services.UserService
import authentication.utils.SessionEnv
import com.mohiva.play.silhouette
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.{LoginEvent, LoginInfo, Silhouette}
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services.AuthenticatorResult
import com.mohiva.play.silhouette.api.util.{Clock, Credentials, PasswordInfo}
import com.mohiva.play.silhouette.impl.exceptions.IdentityNotFoundException
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import javax.inject.Inject
import play.api.Configuration
import play.api.i18n.{I18nSupport, Messages}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Request}

import scala.concurrent.{ExecutionContext, Future}
import scala.concurrent.duration.FiniteDuration

class SignInController @Inject() (components: ControllerComponents,
                        silhouette: Silhouette[SessionEnv], userService: UserService,
                                  authInfoRepository: AuthInfoRepository,
                                  credentialsProvider: CredentialsProvider,configuration: Configuration,
                                  clock: Clock )(implicit

                                                 ex: ExecutionContext) extends AbstractController(components) with I18nSupport {

  def view = silhouette.UnsecuredAction.async { implicit request: Request[AnyContent] =>
    Future.successful(Ok(views.html.signIn("Login",SignInForm.form)))
  }

  def submit  = silhouette.UnsecuredAction.async { implicit request: Request[AnyContent] =>
    SignInForm.form.bindFromRequest.fold(
      form => Future.successful(BadRequest(views.html.signIn("Error",form))),
      data => {
        val credentials = Credentials(data.userName, data.password)
        credentialsProvider.authenticate(credentials).flatMap { loginInfo =>
          userService.retrieve(loginInfo).flatMap {

            case Some(user) =>
              authInfoRepository.find[PasswordInfo](new LoginInfo(user.userName,user.userName)).flatMap {
               // case Some(totpInfo) => Future.successful(Ok(""))
                case _ => authenticateUser(user)
              }
            case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
          }
        }.recover {
          case _: ProviderException =>
            Redirect(routes.SignInController.view()).flashing("error" -> Messages("invalid.credentials"))
        }
      }
    )
  }

  protected def authenticateUser(user: authentication.model.User)(implicit request: Request[_]): Future[AuthenticatorResult] = {
    val c = configuration.underlying
    val result = Redirect(routes.HomeController.index())
    silhouette.env.authenticatorService.create(new LoginInfo(user.userName,user.userName)).map {

      case authenticator => authenticator
    }.flatMap { authenticator =>
      silhouette.env.eventBus.publish(LoginEvent(user, request))
      silhouette.env.authenticatorService.init(authenticator).flatMap { v =>
        silhouette.env.authenticatorService.embed(v, result)
      }
    }
  }

}
