# Project
- Development-Team: Lisa Rieder, Cristina Titrat, Julius Arzberger, Ronja Fricke, Katrin Stötter
- Created in the course of the module:  
  Softwarepraktikum Schnittstellenentwurf [122117, 10-MCS-SPSE-152-m01] of the Julius-Maximilians-Universität Würzburg. Bachelor degree programme Human-Computer Systems.
  
**Unfortunately, the website cannot be tested live as the server has been taken offline by the University of Würzburg. A video demonstrating the main features can be found on** [Youtube](https://youtu.be/P_uBGOB-F3g).

## Some Screenshots of the website
![image](https://github.com/Distr0hopper/barista-learning-website/assets/100717485/b99b6426-2fd7-4955-ba0b-11ab30367be2)

![image](https://github.com/Distr0hopper/barista-learning-website/assets/100717485/c60255b3-5ef0-48a2-9abf-96b6bac5d216)

![image](https://github.com/Distr0hopper/barista-learning-website/assets/100717485/1a3f3379-1332-4bba-9491-32f4951f305f)

![image](https://github.com/Distr0hopper/barista-learning-website/assets/100717485/4f9f9316-f43e-4aa9-892c-9bff7460f425)




# Play Server
## Installation - Deprecated 
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
