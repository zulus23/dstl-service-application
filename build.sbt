import play.sbt.routes.RoutesKeys

ThisBuild / name := "dstl-service-application"
ThisBuild / version := "1.0"
ThisBuild / scalaVersion := "2.13.1"

resolvers += Resolver.jcenterRepo
resolvers += Resolver.mavenCentral

val defaultResolvers = Seq(
  "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases",
  "Akka Snapshot Repository" at "https://repo.akka.io/snapshots/"
)


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
    .settings(
      resolvers ++= Seq(
        Resolver.mavenCentral),
       /* Resolver.sonatypeRepo("releases"),
        Resolver.sonatypeRepo("snapshots")),*/

      libraryDependencies ++= Seq(
        "com.mohiva" %% "play-silhouette" % "6.1.0",
        "com.mohiva" %% "play-silhouette-password-bcrypt" % "6.1.0",
        "com.mohiva" %% "play-silhouette-crypto-jca" % "6.1.0",
        "com.mohiva" %% "play-silhouette-persistence" % "6.1.0",
        "com.mohiva" %% "play-silhouette-testkit" % "6.1.0" % "test"
      ),

    )



libraryDependencies ++= Seq(jdbc, ehcache, ws, specs2 % Test, guice,
  "com.microsoft.sqlserver" % "mssql-jdbc" % "7.4.1.jre11",
  "com.typesafe.play" %% "play-slick" % "4.0.2",
  "net.codingwell" %% "scala-guice" % "4.2.6",
  "com.iheart" %% "ficus" % "1.4.7"
)



fork in Compile := true
