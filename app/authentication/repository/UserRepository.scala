package authentication.repository

import authentication.model.{Enterprise, User, UserEnterprise, UserPassword}
import javax.inject.{Inject, Singleton}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.db.NamedDatabase
import slick.jdbc.{GetResult, JdbcProfile}
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

    var enterpriseList: Option[Seq[EnterpriseTable]] = None
    /**
     * This is the tables default "projection".
     *
     * It defines how the columns are converted to and from the Person object.
     *
     * In this case, we are simply passing the id, name and page parameters to the Person case classes
     * apply and unapply methods.
     */
    def * = (id, name, idService,description.?) <> ((User.apply _).tupled, User.unapply)
  }
  private class UserPasswordTable(tag: Tag) extends Table[UserPassword](tag, "gtk_dstl_user") {

    /** The ID column, which is the primary key, and auto incremented */
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    /** The name column */
    def password = column[String]("password")

    /** The age column */


    /**
     * This is the tables default "projection".
     *
     * It defines how the columns are converted to and from the Person object.
     *
     * In this case, we are simply passing the id, name and page parameters to the Person case classes
     * apply and unapply methods.
     */
    def * = (id, name,password) <> ((UserPassword.apply _).tupled, UserPassword.unapply)
  }
  private class EnterpriseTable(tag: Tag) extends Table[Enterprise](tag, "gtk_dstl_enterprise") {

    /** The ID column, which is the primary key, and auto incremented */
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    /** The name column */
    def dbName = column[String]("sldb")

    /** The age column */


    /**
     * This is the tables default "projection".
     *
     * It defines how the columns are converted to and from the Person object.
     *
     * In this case, we are simply passing the id, name and page parameters to the Person case classes
     * apply and unapply methods.
     */
    def * = (id, name,dbName) <> ((Enterprise.apply _).tupled, Enterprise.unapply)
  }
  private class UserEnterpriseTable(tag: Tag) extends Table[UserEnterprise](tag, "gtk_dstl_userEnterprise") {

    /** The ID column, which is the primary key, and auto incremented */
    def idUser = column[Int]("idUser")
    def idEnterprise = column[Int]("idEnterprise")
    def userFk = foreignKey("user_fk",idUser,users)(_.id)
    def enterpriseFk = foreignKey("enterprise_fk",idEnterprise,enterprises)(_.id)
    def pk = primaryKey("pk",(idUser,idEnterprise))

    /**
     * This is the tables default "projection".
     *
     * It defines how the columns are converted to and from the Person object.
     *
     * In this case, we are simply passing the id, name and page parameters to the Person case classes
     * apply and unapply methods.
     */
    def * = (idUser, idEnterprise) <> ((UserEnterprise.apply _).tupled, UserEnterprise.unapply)
  }





  private val users = TableQuery[UserTable]
  private val userPasswords = TableQuery[UserPasswordTable]
  private val enterprises = TableQuery[EnterpriseTable]
  private val userEnterprises = TableQuery[UserEnterpriseTable]

  implicit val getUserResult = GetResult(r => User(r.nextInt, r.nextString, r.nextInt,
                                                   Some(r.nextString)))


  def findByName(userName:String): Future[Seq[(User,Enterprise)]] = db.run{
    val userAction =  sql"select id, name, idService,description from gtk_dstl_user".as[User]
    val results = (for {
      user <- users.filter(_.name.toLowerCase === userName.toLowerCase)
      ue <- userEnterprises if ue.idUser === user.id
      enterprise <- enterprises if enterprise.id === ue.idEnterprise
    } yield(user,enterprise)).result



   /* val results  = for{
      user <- users.filter(_.name.toLowerCase === userName.toLowerCase)
      ue <- userEnterprises if ue.idUser === user.id
      enterprise <- enterprises if enterprise.id === ue.idEnterprise
    } yield(user,enterprise)
    results.groupBy(_._1)map {
      case(user,tuples) => {
        user.enterpriseList = Some(tuples.map(_._2).resul)
        user
      }
    }*/
     results

      //= users.filter(_.name.toLowerCase === userName.toLowerCase ).result.map(_.headOption)

  }
  def findPasswordByUserName(userName:String): Future[Option[UserPassword]] = db.run {
    val result = userPasswords.filter(_.name.toLowerCase === userName.toLowerCase ).result.map(_.headOption)
    result
  }

  def findEnterpriseByUser(userName:String):Future[Seq[Enterprise]] = db.run {
    val results = ( for {
      user <- users.filter(_.name.toLowerCase === userName.toLowerCase)
      ue <- userEnterprises if ue.idUser === user.id
      enterprise <- enterprises if enterprise.id === ue.idEnterprise
    } yield(enterprise)).result
      results
  }

}
