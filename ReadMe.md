# Project
- Development-Team: Lisa Rieder, Cristina Titrat, Julius Arzberger, Ronja Fricke, Katrin Stötter
- Entstanden im Zuge des Moduls:  
  Softwarepraktikum Schnittstellenentwurf [122117, 10-MCS-SPSE-152-m01] der Julius-Maximilians-Universität Würzburg. Bachelor Studiengang Mensch-Computer Systeme.

Video: https://youtu.be/ILSIfWrq8zk


# Play Server
## Installation
Prerequisites: Git, Amazon Coretto JDK 11, IntelliJ IDEA with Scala plug-in, sbt

The project can be open only through the University VPN. Make sure to connect before running the application.

1. Clone the play-server project from GitLab using SSH git@gitlab2.informatik.uni-wuerzburg.de:hci/teaching/sopra/student-material/ws21/02-group/play-server.git.
2. Start IntelliJ IDEA and import the project. Make sure to import it as a sbt project and select SDK corento-11 in Project Structure.
3. Open the **sbt shell** and write <code>run</code> or the terminal and write <code>sbt</code> run for starting the project.
   
<code>sbt run</code>

The application is available on <code>localhost:9000</code>.
Open a browser (preferable **Google Chrome**) and access <code>localhost:9000</code>.
For a new User with 0 points you can just use the register page to create one
In case you want a user that has access to all game levels is the evaluationUsers login data:
user: evaluationUser
password: TheBaristaGameIsGreat1603$
Be sure to read the <span style="color: yellow;">User Manual</span> before you play
It is important to always play the levels in the correct order, so the coffees can be fetched matching eachother (order per Level: 1. Coffee Mixing, 2. Memory, 3. Calculation)