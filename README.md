# Play Server

## Installation

Prerequisites: `Git`, `Amazon Coretto JDK 11`, `IntelliJ IDEA` with `Scala plug-in`, `sbt`

The project can be open only through the **University VPN**. Make sure to connect before running the application.

1. Clone the _play-server_ project from [GitLab](https://gitlab2.informatik.uni-wuerzburg.de/hci/teaching_/sopra/student-material/ws21/02-group/play-server) using SSH `git@gitlab2.informatik.uni-wuerzburg.de:hci/teaching/sopra/student-material/ws21/02-group/play-server.git`.
2. Start IntelliJ IDEA and import the project. Make sure to import it as a sbt project and select SDK `corento-11` in Project Structure.
3. Open the **sbt shell** and write `run` or the terminal and write `sbt run` for starting the project.
```
sbt run
```
4. The application is available on `localhost:9000`.
5. Open a browser (preferable **Google Chrome**) and access `localhost:9000`.
    1. For a new User with 0 points you can just use the register page to create one
    2. In case you want a user that has access to all game levels is the evaluationUsers login data:
        1. user: evaluationUser
        2. password: TheBaristaGameIsGreat1603$
6. Be sure to read the User Manual before you play
    1. It is important to always play the levels in the correct order, so the coffees can be fetched matching eachother
        (order: 1. Coffee Mixing, 2. Memory, 3. Calculation per Level)
