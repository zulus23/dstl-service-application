package authentication.repository

import authentication.model.User
import javax.inject.{Inject, Singleton}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.db.NamedDatabase
import slick.jdbc.JdbcProfile
import slick.jdbc.SQLServerProfile.api._

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class UserRepository  @Inject() (
                                  @play.db.NamedDatabase(value="sl_dstl") _dbConfigProvider: DatabaseConfigProvider)
                                (implicit ec: ExecutionContext) extends HasDatabaseConfigProvider[JdbcProfile]{
  override protected val dbConfigProvider: DatabaseConfigProvider = _dbConfigProvider

  // These imports are important, the first one brings db into scope, which will let you do the actual db operations.
  // The second one brings the Slick DSL into scope, which lets you define the table and other queries.



  private class UserTable(tag: Tag) extends Table[User](tag, "gtk_dstl_user") {

    /** The ID column, which is the primary key, and auto incremented */
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

    /** The name column */
    def name = column[String]("name")

    /** The age column */
    def idService = column[Int]("idService")
    def description = column[String]("description")

    /**
     * This is the tables default "projection".
     *
     * It defines how the columns are converted to and from the Person object.
     *
     * In this case, we are simply passing the id, name and page parameters to the Person case classes
     * apply and unapply methods.
     */
    def * = (id, name, idService,description) <> ((User.apply _).tupled, User.unapply)
  }
  private val users = TableQuery[UserTable]

  def findByName(userName:String): Future[Option[User]] = db.run {
    val result = users.filter(_.name.toLowerCase === userName.toLowerCase ).result.map(_.headOption)
    result
  }


}
