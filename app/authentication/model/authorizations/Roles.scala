package authentication.model.authorizations

import authentication.model.User
import com.mohiva.play.silhouette.api.Authorization
import com.mohiva.play.silhouette.impl.authenticators.JWTAuthenticator
import play.api.mvc.Request

import scala.concurrent.Future

case class withRole(role:Role) extends Authorization[User,JWTAuthenticator] {
  override def isAuthorized[B](user: User, authenticator: JWTAuthenticator)(implicit request: Request[B]): Future[Boolean] = user.roles match {
    case list: Seq[Role] => Future.successful(list.contains(role))
    case _ => Future.successful(false)
  }


}
trait Role {

}
