package authentication

import com.mohiva.play.silhouette.api.actions.SecuredErrorHandler
import javax.inject.Inject
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.mvc.Results.Redirect
import play.api.mvc.{RequestHeader, Result}

import scala.concurrent.Future

class CustomSecuredErrorHandler @Inject() (val messagesApi: MessagesApi) extends SecuredErrorHandler with I18nSupport {
  override def onNotAuthenticated(implicit request: RequestHeader): Future[Result] = ???
   //Future.successful(Redirect(controllers.routes.SignInController.view()))

  override def onNotAuthorized(implicit request: RequestHeader): Future[Result] = ???
}
