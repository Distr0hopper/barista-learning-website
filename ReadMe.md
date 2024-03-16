# Project
- Development-Team: Lisa Rieder, Cristina Titrat, Julius Arzberger, Ronja Fricke, Katrin Stötter
- Created in the course of the module:  
  Softwarepraktikum Schnittstellenentwurf [122117, 10-MCS-SPSE-152-m01] of the Julius-Maximilians-Universität Würzburg. Bachelor degree programme Human-Computer Systems.
- Website to learn how to make different types of coffee through gamification. Learn how to make coffee on 3 levels, including a drag-and-drop game of ingredients to mix a coffee, a memory game to mentally practise which customer ordered what, and a game to train mental arithmetic.
- The logged-in players can be visited via an authering tool that visualises the SQL database in the background.
  
**Unfortunately, the website cannot be tested live as the server has been taken offline by the University of Würzburg. A video demonstrating the main features can be found on** [Youtube](https://youtu.be/P_uBGOB-F3g).

## Some Screenshots of the website
![image](https://github.com/Distr0hopper/barista-learning-website/assets/100717485/2286b2df-5a02-4003-9665-78a6da61cded)

![image](https://github.com/Distr0hopper/barista-learning-website/assets/100717485/d8224497-665f-492b-bfd4-3ba4498881d0)

![image](https://github.com/Distr0hopper/barista-learning-website/assets/100717485/1c04eebc-e11c-4102-9252-2d57877549af)

![image](https://github.com/Distr0hopper/barista-learning-website/assets/100717485/c23f4846-c9ce-4384-aa9c-7091ca226aea)

![image](https://github.com/Distr0hopper/barista-learning-website/assets/100717485/f9e00556-c731-46b1-9d6e-f5c8b59aa9c7)

![image](https://github.com/Distr0hopper/barista-learning-website/assets/100717485/09294cee-2219-4755-9ee0-0b11c2386a6c)


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
