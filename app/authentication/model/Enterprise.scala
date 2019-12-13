package authentication.model

import play.api.libs.json.Json

case class Enterprise(id:Int,name: String, dbName: String)

object Enterprise {
  implicit  val enterpriseToJson = Json.writes[Enterprise]
}