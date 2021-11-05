lazy val root = (project in file(".")).enablePlugins(PlayJava)

name := """play-java-starter-example"""
version := "1.0-SNAPSHOT"
scalaVersion := "2.13.6"
libraryDependencies += guice

// Official Database
libraryDependencies += javaJdbc
libraryDependencies += "mysql" % "mysql-connector-java" % "8.0.25"

// Test Database
libraryDependencies += "com.h2database" % "h2" % "1.4.200"

// Testing libraries for dealing with CompletionStage...
libraryDependencies += "org.assertj" % "assertj-core" % "3.21.0" % Test
libraryDependencies += "org.awaitility" % "awaitility" % "4.1.0" % Test

javacOptions ++= Seq(
  "-encoding", "UTF-8",
  "-parameters",
  "-Xlint:unchecked",
  "-Xlint:deprecation",
  "-Werror"
)
// Make verbose tests
testOptions in Test := Seq(Tests.Argument(TestFrameworks.JUnit, "-a", "-v"))
