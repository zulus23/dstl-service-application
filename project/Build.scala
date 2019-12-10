
import sbt._
import Keys._
import play.routes.compiler.InjectedRoutesGenerator
import sbt.Keys._
import sbt.{Resolver, _}

object Common {

  val settings = Seq(
    scalaVersion := "2.13.1",
    organization := "ru.gotek",
    version := "1.0-SNAPSHOT",

  )

  def projectSettings = settings ++ Seq(


    //javacOptions ++= Seq("-source", "1.8", "-target", "1.8"),
    scalacOptions ++= Seq(
      "-encoding", "UTF-8", // yes, this is 2 args
      "-deprecation",
      "-feature",
      "-unchecked",
      "-Xlint",
      "-Ywarn-numeric-widen",
     // "-language:reflectiveCalls"
    ),
    resolvers ++= Seq(
      Resolver.sonatypeRepo("releases"),
      Resolver.sonatypeRepo("snapshots")),
    libraryDependencies ++= Seq(
      "javax.inject" % "javax.inject" % "1",
      "joda-time" % "joda-time" % "2.9.9",
      "org.joda" % "joda-convert" % "1.9.2",
      "com.google.inject" % "guice" % "4.1.0"
    ),
    scalacOptions in Test ++= Seq("-Yrangepos")
  )

}
