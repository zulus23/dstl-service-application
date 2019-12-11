package authentication.forms

import play.api.data.Form
import play.api.data.Forms._

object SignInForm {
  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "userName" -> text,
      "password" -> nonEmptyText,

    )(Data.apply)(Data.unapply)
  )

  /**
   * The form data.
   *
   * @param userName The email of the user.
   * @param password The password of the user.
   *
   */
  case class Data(
                   userName: String,
                   password: String
                  )
}
