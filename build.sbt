import play.sbt.routes.RoutesKeys

ThisBuild / name := "dstl-service-application"
ThisBuild / version := "1.0"
ThisBuild / scalaVersion := "2.13.1"

/*
lazy val commonSettings = Seq(
  organization := "ru.gotek",
  version := "1.0-SNAPSHOT",

  scalaVersion := "2.13.1",
  scalacOptions ++= Seq("-feature", "-language:postfixOps"),
  routesGenerator := InjectedRoutesGenerator,
  resolvers ++= defaultResolvers
)*/
val defaultResolvers = Seq(
  "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases",
  "Akka Snapshot Repository" at "https://repo.akka.io/snapshots/"
)



/*
PlayKeys.devSettings += ("play.http.router", "admin.Routes")
PlayKeys.devSettings += ("play.http.router", "routes")
*/

lazy val dstlServiceCommon = (project in file("common")).settings(
  Common.projectSettings
)
lazy val admin = (project in file("modules/admin")).enablePlugins(PlayScala).settings(
  Common.projectSettings

)

//Common.projectSettings
lazy val root = (project in file(".")).enablePlugins(PlayScala,LauncherJarPlugin)

  .aggregate(dstlServiceCommon,admin)
  .dependsOn(dstlServiceCommon,admin)



libraryDependencies ++= Seq(jdbc, ehcache, ws, specs2 % Test, guice,
  "com.microsoft.sqlserver" % "mssql-jdbc" % "7.4.1.jre11",
)



fork in Compile := true
