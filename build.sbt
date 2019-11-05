name := "dstl-service-application"
 
version := "1.0" 
      
lazy val `dstl-service-application` = (project in file(".")).enablePlugins(PlayScala,LauncherJarPlugin)


scalaVersion := "2.13.1"

libraryDependencies ++= Seq( jdbc , ehcache , ws , specs2 % Test , guice,
"com.microsoft.sqlserver" % "mssql-jdbc" % "7.4.1.jre11",
)


resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"

resolvers += "Akka Snapshot Repository" at "https://repo.akka.io/snapshots/"

//unmanagedResourceDirectories in Test +=  {baseDirectory ( _ /"target/web/public/test" )}

      