# BLaundry

This is a silly game about a bear who likes clean laundry.  Help the bear gather as many clothes as possible before time runs out.

Play the game at https://blaundry.herokuapp.com/.

# Demo

![BLaundry01](/screenshots/BLaundry01.png?raw=true "Screenshot1")

![BLaundry02](/screenshots/BLaundry02.png?raw=true "Screenshot2")

![BLaundry03](/screenshots/BLaundry03.png?raw=true "Screenshot3")

# Presentation

[![Grace Hopper Presentation](http://img.youtube.com/vi/AYr8TyXMg-Q/0.jpg)](http://www.youtube.com/watch?v=AYr8TyXMg-Q)

# Notes

BLaundry is an online game that anyone can run in their browser. The game is controlled with arrows keys (left, right, up) or the space bar (for jumping).

BLaundry was built using Express and Phaser.js. Each player's highest score is stored in their browser via local HTML storage. There are 5 game states (Boot, Preload, Menu, Game, and End).

# For Developers

<b>Local Development</b>
<ul>
  <li>Fork the Repo</li>
  <li>Git Clone</li>
  <li>npm install</li>
</ul>

<b>Heroku Deployment</b>
<ul>
  <li>You must have the following:
    <ul>
      <li>Heroku account</li>
      <li>Node / npm installed locally</li>
      <li>Heroku Command Line Interface installed locally</li>
    </ul>
  </li>
  <li>In the command line:
    <ul>
      <li>heroku login</li>
      <li>heroku create appNameHere</li>
      <li>git push heroku master</li>
    </ul>
  </li>
</ul>

# Resources

I used the following resources while making BLaundry.

phaser js<br />
http://phaser.io/<br />
https://github.com/photonstorm/phaser<br />
https://github.com/photonstorm/phaser-examples<br />

Game Graphics<br />
https://openclipart.org/<br />
https://opengameart.org/<br />

Other<br />
https://v-play.net/game-resources/16-sites-featuring-free-game-graphics<br />
https://draeton.github.io/stitches/<br />
https://gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/<br />
https://www.w3schools.com/html/html5_webstorage.asp<br />
