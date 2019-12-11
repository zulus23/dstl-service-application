package authentication.model

import com.mohiva.play.silhouette.api.Identity
import play.api.libs.json.Json

case class User(userId: Int, userName: String, idService: Int, description: String) extends Identity

object User {
  implicit val userToJson = Json.writes[User]
}
