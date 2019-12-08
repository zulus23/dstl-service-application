package authentication.services
import authentication.daos.UserDAO
import authentication.model.User
import com.mohiva.play.silhouette.api.LoginInfo
import javax.inject.Inject

import scala.concurrent.Future

class UserServiceImpl @Inject()(userDao: UserDAO) extends UserService {
  override def save(user: User): Future[User] = ???


  override def retrieve(loginInfo: LoginInfo): Future[Option[User]] = userDao.find(loginInfo)
}
