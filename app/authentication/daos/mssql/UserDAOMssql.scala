package authentication.daos.mssql

import java.util.UUID

import authentication.daos.UserDAO
import authentication.model.User
import com.mohiva.play.silhouette.api.LoginInfo

import scala.concurrent.Future

class UserDAOMssql  extends UserDAO{
  /** Finds a user by its login info.
   *
   * @param loginInfo The login info of the user to find.
   * @return The found user or None if no user for the given login info could be found.
   */
  override def find(loginInfo: LoginInfo): Future[Option[User]] = Future.successful(Option(User(UUID.randomUUID(),loginInfo,Some("Ivan"),Some("Ivan"),Some(""),Some(""),None)))

  /** Finds a user by its user ID.
   *
   * @param userID The ID of the user to find.
   * @return The found user or None if no user for the given ID could be found.
   */
  override def find(userID: UUID): Future[Option[User]] = ???
}
