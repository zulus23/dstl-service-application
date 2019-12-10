package authentication.utils

import authentication.model.User
import com.mohiva.play.silhouette.api.Env
import com.mohiva.play.silhouette.impl.authenticators.SessionAuthenticator


trait SessionEnv extends Env {
  type I = User
  type A = SessionAuthenticator
}
