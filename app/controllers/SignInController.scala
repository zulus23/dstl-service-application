package controllers

import akka.http.scaladsl.model.HttpHeader.ParsingResult.Ok
import authentication.utils.SessionEnv
import com.mohiva.play.silhouette
import com.mohiva.play.silhouette.api.Silhouette
import javax.inject.Inject
import play.api.i18n.I18nSupport
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Request}

import scala.concurrent.Future

class SignInController @Inject() (components: ControllerComponents,
                        silhouette: Silhouette[SessionEnv] ) extends AbstractController(components) with I18nSupport {

  def view = silhouette.UnsecuredAction.async { implicit request: Request[AnyContent] =>
    Future.successful(Ok(views.html.signIn()))
  }
}
