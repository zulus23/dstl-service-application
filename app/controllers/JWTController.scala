package controllers

import authentication.utils.{JWTEnv, SessionEnv}
import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.actions.{SecuredActionBuilder, SecuredRequest}
import javax.inject.Inject
import play.api.i18n.I18nSupport
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}

import scala.concurrent.{ExecutionContext, Future}

class JWTController @Inject()(cc: ControllerComponents,silhouette: Silhouette[SessionEnv])(implicit ex: ExecutionContext)
         extends AbstractController(cc) with I18nSupport {
  val SecuredAction: SecuredActionBuilder[SessionEnv, AnyContent] = silhouette.SecuredAction

    def getToken:Action[AnyContent]= silhouette.UserAwareAction{ implicit request =>
      println("-----------------------------------------")
      request.identity match {
        case Some(identity) => Ok(Json.toJson(identity))
        case None => Ok("")
      }


    }
}
