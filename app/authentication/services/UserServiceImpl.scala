package authentication.services
import authentication.daos.UserDAO
import authentication.model.User
import authentication.repository.UserRepository
import com.mohiva.play.silhouette.api.LoginInfo
import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}

class UserServiceImpl @Inject()(userRepository: UserRepository)(implicit ex: ExecutionContext)  extends UserService {
  override def save(user: User): Future[User] = ???


  override def retrieve(loginInfo: LoginInfo): Future[Option[User]] = userRepository.findByName(loginInfo.providerID)
}
