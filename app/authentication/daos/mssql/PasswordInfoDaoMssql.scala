package authentication.daos.mssql

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.util.PasswordInfo
import com.mohiva.play.silhouette.persistence.daos.DelegableAuthInfoDAO
import javax.inject.Inject

import scala.concurrent.Future
import scala.reflect.ClassTag

class PasswordInfoDaoMssql  extends DelegableAuthInfoDAO[PasswordInfo]{

    override def find(loginInfo: LoginInfo): Future[Option[PasswordInfo]] = ???

  override def add(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] = ???

  override def update(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] = ???

  override def save(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] = ???

  override def remove(loginInfo: LoginInfo): Future[Unit] = ???

  override val classTag: ClassTag[PasswordInfo] = null
}
