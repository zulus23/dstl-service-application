package controllers.admin

import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}

class Application @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  /**
   * Create an Action to render an HTML page with a welcome message.
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index = Action {
    Ok("admin")
  }

}
