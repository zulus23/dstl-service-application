package controllers

import authentication.utils.{JWTEnv, SessionEnv}
import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.actions.SecuredActionBuilder
import javax.inject._
import play.api.mvc._

import scala.concurrent.Future

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(silhouette: Silhouette[JWTEnv], cc: ControllerComponents) extends AbstractController(cc) {
  val SecuredAction: SecuredActionBuilder[JWTEnv, AnyContent] =
    silhouette.SecuredAction
  /**
   * Create an Action to render an HTML page with a welcome message.
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index = SecuredAction.async{ implicit request =>
    Future.successful(Ok(views.html.index("Your new application is ready.")))
  }

}
