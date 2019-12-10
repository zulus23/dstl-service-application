package controllers

import akka.http.scaladsl.model.HttpHeader.ParsingResult.Ok
import authentication.forms.SignInForm
import authentication.services.UserService
import authentication.utils.SessionEnv
import com.mohiva.play.silhouette
import com.mohiva.play.silhouette.api.{LoginEvent, Silhouette}
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services.AuthenticatorResult
import com.mohiva.play.silhouette.api.util.{Clock, Credentials, PasswordInfo}
import com.mohiva.play.silhouette.impl.User
import com.mohiva.play.silhouette.impl.exceptions.IdentityNotFoundException
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import javax.inject.Inject
import play.api.Configuration
import play.api.i18n.I18nSupport
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
      form => Future.successful(BadRequest(views.html.signIn("",form))),
      data => {
        val credentials = Credentials(data.email, data.password)
        credentialsProvider.authenticate(credentials).flatMap { loginInfo =>
          userService.retrieve(loginInfo).flatMap {
            case Some(user) =>
              Future.successful(Ok(""))
            case Some(user) =>
              authInfoRepository.find[PasswordInfo](user.loginInfo).flatMap {
                case Some(totpInfo) => Future.successful(Ok(""))
                case _ => authenticateUser(null)
              }
            case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
          }
        }
      }
    )
  }

  protected def authenticateUser(user: User)(implicit request: Request[_]): Future[AuthenticatorResult] = {
    val c = configuration.underlying
    val result = Redirect(routes.HomeController.index())
    silhouette.env.authenticatorService.create(user.loginInfo).map {

      case authenticator => authenticator
    }.flatMap { authenticator =>
      silhouette.env.eventBus.publish(LoginEvent(user, request))
      silhouette.env.authenticatorService.init(authenticator).flatMap { v =>
        silhouette.env.authenticatorService.embed(v, result)
      }
    }
  }

}
