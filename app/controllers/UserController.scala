package controllers

import authentication.services.UserService
import authentication.utils.JWTEnv
import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.actions.{SecuredActionBuilder, SecuredRequest}
import com.mohiva.play.silhouette.api.util.Clock
import javax.inject.Inject
import play.api.i18n.I18nSupport
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, AnyContent, ControllerComponents}

import scala.concurrent.ExecutionContext

class UserController @Inject() (components: ControllerComponents,
                                silhouette: Silhouette[JWTEnv], userService: UserService,
                                clock: Clock )(implicit

                                               ex: ExecutionContext) extends AbstractController(components) with I18nSupport {

  val SecuredAction: SecuredActionBuilder[JWTEnv, AnyContent] =
    silhouette.SecuredAction


  def userEnterprise()=  SecuredAction.async{ implicit request: SecuredRequest[JWTEnv,AnyContent] =>
    val user =  request.authenticator.loginInfo.providerKey
    val result =  userService.enterprises(user)
    result.map(enterprise => Ok(Json.toJson(enterprise)))
  }

}
