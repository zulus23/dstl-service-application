package authentication.services
import authentication.daos.UserDAO
import authentication.model.{Enterprise, User}
import authentication.repository.UserRepository
import com.mohiva.play.silhouette.api.LoginInfo
import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}

class UserServiceImpl @Inject()(userRepository: UserRepository)(implicit ex: ExecutionContext)  extends UserService {
  override def save(user: User): Future[User] = ???


  override def retrieve(loginInfo: LoginInfo): Future[Option[User]] = {
    userRepository.findByName(loginInfo.providerKey).map {
      case u => u.groupBy(_._1).map {
        case (t1, tuples) => {
          t1.enterpriseList = Some(tuples.map(_._2))
          t1
        }
      }
    }.map(_.headOption)
  }

  override def enterprises(username: String): Future[Seq[Enterprise]] =  {
    userRepository.findEnterpriseByUser(username)
  }
}
