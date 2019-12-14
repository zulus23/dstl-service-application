package authentication.model

import com.mohiva.play.silhouette.api.Identity
import play.api.libs.json.Json

import scala.collection.immutable.Stream.Empty

case class User(userId: Int, userName: String, idService: Int, description: Option[String] ) extends Identity {
  var enterpriseList: Option[Seq[Enterprise]] = None
}

object User {

  implicit val userToJson = Json.writes[User]
}
case class UserPassword(userId: Int,userName: String,password:String)

case class UserEnterprise(idUser: Int, idEnterprise: Int)