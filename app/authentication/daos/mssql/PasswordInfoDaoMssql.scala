package authentication.daos.mssql

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.util.PasswordInfo
import com.mohiva.play.silhouette.persistence.daos.DelegableAuthInfoDAO
import javax.inject.Inject

import scala.concurrent.Future
import scala.reflect.ClassTag

class PasswordInfoDaoMssql @Inject()(implicit
                                     val classTag: ClassTag[PasswordInfo]) extends DelegableAuthInfoDAO[PasswordInfo]{

    override def find(loginInfo: LoginInfo): Future[Option[PasswordInfo]] =  Future.successful(Some(new PasswordInfo("dummy-hasher","3",null)))

  override def add(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] = ???

  override def update(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] = ???

  override def save(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] = ???

  override def remove(loginInfo: LoginInfo): Future[Unit] = ???


}
