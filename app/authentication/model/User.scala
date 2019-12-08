package authentication.model

import java.util.UUID

import com.mohiva.play.silhouette.api.{Identity, LoginInfo}
import com.mohiva.play.silhouette.api.util.PasswordInfo

case class User(
                 userId: UUID,
                 loginInfo: LoginInfo,
                 firstName: Option[String],
                 lastName: Option[String],
                 fullName: Option[String],
                 email: Option[String],
                 passwordInfo: Option[PasswordInfo],
                 //role: Role = UserRole,
                 /*rateLimit: Long = RateLimitActor.DefaultLimit*/) extends Identity

