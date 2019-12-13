package authentication.daos.mssql

import authentication.repository.UserRepository
import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.util.PasswordInfo
import com.mohiva.play.silhouette.persistence.daos.DelegableAuthInfoDAO
import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}
import scala.reflect.ClassTag

class PasswordInfoDaoMssql @Inject()(userRepository: UserRepository)(implicit
                                     val classTag: ClassTag[PasswordInfo], ec: ExecutionContext) extends DelegableAuthInfoDAO[PasswordInfo]{

    override def find(loginInfo: LoginInfo): Future[Option[PasswordInfo]] =  userRepository.findPasswordByUserName(loginInfo.providerKey).map {
      user => user.map { p => new PasswordInfo("dummy-hasher",p.password)}
    }


  override def add(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] = ???

  override def update(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] = ???

  override def save(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] = ???

  override def remove(loginInfo: LoginInfo): Future[Unit] = ???


}
