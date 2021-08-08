/* global
 *    background, createCanvas, ellipse, stroke, rect, fill, colorMode, HSB,
 *    width, height, noStroke, textAlign, CENTER, text, mouseX, mouseY, LEFT,
 *    textSize, keyCode, textStyle, BOLD, textFont, loadImage, imagerandom, UP_ARROW, LEFT_ARROW, 
 *    RIGHT_ARROW, DOWN_ARROW, image, random, frameCount, drawImage, collideCircleCircle,
 *    keyPressed, loadSound, setVolume, createSlider
 */
let backgroundColor, sceneNum, titleScreenBackground, battleBackground,
    victoryBackground, playerSprite, floor, mallIconLeft, mallIconRight, 
    redVirus, blueVirus, purpleVirus, time, hour, minute, player, carrier, map, 
    score, workplaceLeft, workplaceRight, gameIsOver, iconLeft, iconRight,
    carriers, bCell, playerHealth, covidHealth, turns, newBattle,
    bcell, virus, schoolTop, schoolBottom, clinic, width, height, xVelocity, 
    yVelocity, c, colors, num, introSong, battleSong, slider, newPress;

function preload() {
  introSong = loadSound("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2FUpbeat%20Drums%20Background%20Music%20For%20Videos.mp3?v=1628215329317");
  battleSong = loadSound("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2FPoke%CC%81mon!-RedBlue%20Wild%20Battle%20Music.mp3?v=1628271940832");
} 

function setup() {
  width = 600;
  height = 1000;
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  sceneNum = 0;
  
  titleScreenBackground = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2FTitleScreen.v1.jpg?v=1628004425839");
  battleBackground = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2FWebp.net-resizeimage.png?v=1628109071581");
  victoryBackground = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2Fvictory_screen.jpeg?v=1628108935420");
  
  playerSprite = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2Funtitled305_20210802151623.png?v=1627942726651");
  floor = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2Fc719c4e54841308f3f4defa6eb972d8f.jpg?v=1628107062015");
  mallIconLeft = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2FMall_Map_Side%20(1)%20(1).jpg?v=1627951426228");
  mallIconRight = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2Fimage%20(1).jpg?v=1627951476577");
  workplaceLeft = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2Fimageedit_1_2260998446_50%20(1).png?v=1628093185769");
  workplaceRight = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2Fworkplaceright_1_50%20(1).png?v=1628093118483");
  schoolTop = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2Fimageedit_1_7432268956.png?v=1628189122009");
  schoolBottom = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2Fimageedit_1_4832890409.png?v=1628189000500");
  clinic = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2Fclinic.jpeg?v=1628225331952");
  
  redVirus = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2FWebp.net-resizeimage%20(2).png?v=1628109520117");
  blueVirus = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2FWebp.net-resizeimage%20(3).png?v=1628109523445");
  bCell = loadImage("https://cdn.glitch.com/a4f7cb00-c90a-4032-9305-ce3a9be84c64%2FWebp.net-resizeimage%20(1).png?v=1628109516458");
  
  time = 0;
  hour = 6;
  minute = 0;
  turns = [new Turn()];
  newBattle = false;
  newPress = true;
  //frameRate(20);
  //slider = createSlider(0, 1, 0.5, 0.01); 
  introSong.play(); // YES
  introSong.setVolume(0.02);//0 (quietest) < vol < 1 (loudest)
}

function draw() {
  background(backgroundColor);
  switch (sceneNum) {
    case 0:
      // Title Screen
      titleScreen();
      break;
    case 1:
      // Frogger Mall Map
      console.log("scenenum: " + sceneNum);
      froggerMap();
      break;
    case 2:
      // Frogger Workplace Map
      froggerMap();
      break;
    case 3:
      // Frogger School Map
      froggerMap();
      break;
    case 4:
      // Battle Mode
      battleMode();
      break;
    case 5:
      // Player's turn in Battle Mode
      playerTurn();
      break;
    case 6:
      // Display clinic scene if you don't collide w/ any 
      // virus
      vaccineScene();
      break;
    case 7:
      defeatScreen();
      break;
    case 8:
      victoryScreen();
      break;
  }
  handleTime();
}

function titleScreen() {
  image(titleScreenBackground, 0, 0);
  introSong.setVolume(0.02);
  textFont('Courier New');
  textAlign(CENTER);
  textSize(40);
  textStyle(BOLD);
  text("Mask Up, Vax In", width / 2, height / 7);
  textSize(35);
  text("Version 1.0", width / 2, height / 6 + 20);
  textSize(30);
  text("Press ENTER to start", width / 2, height / 6 + 70);
  
  playerSprite.resize(170, 0);
  image(playerSprite, width / 1.6, height / 1.55);
  redVirus.resize(170, 0);
  image(redVirus, width / 30, height / 1.35);
  
  if (keyCode == 13) {
    player = new Player();
    carriers = [new Carrier()];
    sceneNum = player.age;
    hour = 9;
    minute = 0;
    console.log("SceneNum: " + sceneNum);
  }
}

function froggerMap() { 
  // console.log("debugs");
  image(floor, 0, 0); // It works!
  iconLeft = new Icon(sceneNum, 0);
  iconRight = new Icon(sceneNum, 1);
  iconLeft.show();
  iconRight.show();
  
  player.show();
  player.move();
  
  if (frameCount % 100 == 0 && carriers.length < 6) {
    carriers.push(new Carrier());
  }
  for (let i = 0; i < carriers.length; i++) {
    carriers[i].carrierShow();
    carriers[i].carrierMove();
    carriers[i].checkCollisions();
  }
  player.updateScore();
  displayScore();
  displayApptTime();
  displayFroggerInstructions();
  // newTurn = true;
  // console.log("hello?");
  if (hour == player.apptTime) {
    sceneNum = 6;
  }
}

function battleMode() {
  //pokemon background
  image(battleBackground, 0, 0);
  //sprites
  if (newBattle) {
    console.log("new battle");
    battleSong.play();
    battleSong.setVolume(0.02);
    bcell = new Bcell();
    virus = new Covid();
    if (virus.variant == 1) {
      virus.hP = 40;
    }
    newBattle = false;
  }
  
  bcell.show();
  virus.show();
  bcell.displayhP();
  virus.displayhP();
  displayTurn();
  // NO LONGER VERY BUGGY :D
  // console.log("Turns: " + turns);
  // console.log("Bcell hP before: " + bcell.hP);
  // console.log("Virus hP before: " + virus.hP);
  
  if (turns[turns.length - 1].identity == 0) {
    console.log("player turn start");
    sceneNum = 5;
    console.log("scene change read?");
  }
  
  if (turns[turns.length - 1].identity == 1) {
    // console.log("virus turn start");
    virus.useMove();
    if (virus.hP <= 0) {
      for (let i = 0; i < carriers.length; i++) {
        carriers[i].x = random(width);
        carriers[i].y = random(height);
      }
      sceneNum = 8;
    } else if (bcell.hP <= 0) {
      // ER screen
      sceneNum = 7;
    } else {
      sceneNum = 4;
    }
    console.log("bcell hp after virus atk: " + bcell.hP);
    let newTurn = new Turn();
    turns.push(newTurn); // it's fixed! the issue was in virus.useMove() where I forgot to comment out "turns++;" (a leftover from when we tried to iterate turns with an integer variable)
    // console.log("virus turn end");
    newPress = true;
    }
  }

function clearTurns() {
  for (let i = 0; i < turns.length; i++) {
    turns.pop();
  }
  turns = [new Turn()];
  newPress = true;
}

class Turn {
  constructor() {
    this.identity = 0; // 0 for virus, 1 for bcell
  }
  
  setIdentity(identity) {
    if (identity == 1) {
      this.identity = 1;
    }
  }
}

function playerTurn() {
  image(battleBackground, 0, 0);
  bcell.show();
  virus.show();
  textSize(30);
  bcell.displayhP();
  virus.displayhP();
  displayTurn();
  
  textAlign(CENTER);
  textSize(10);
  
  ellipse(350, height - 300, 60);
  ellipse(420, height - 300, 60);
  fill('black');
  text("Attack", 350, height - 300);
  text("Remember", 420, height - 300);
  
  // console.log("player turn end");
}

function vaccineScene() {
  image(clinic, 0, 0);

  // clear-up anti vax misconceptions
  // protect many effects, still wear mask; autoimmune, elderly .. who susceptible
  // herd immunity
  // vaccine choices, how they work
  textSize(20);
  textAlign(CENTER);
  text(
     "You got vaccinated!",
  width / 2, 500);
  text(
     "Please wait for 2 more weeks for",
  width / 2, 530);
  text(
    "your last dose to build full immunity.",
  width / 2, 560);
  text(
     "You are now protected from the deadly",
  width / 2, 590);
  text(
    "effects of Covid-19 and the Delta variant,",
  width / 2, 620);
  text(
     "but it is still recommended to wear masks",
  width / 2, 650);
  text(
    "and social distance to prevent the spread.",
  width / 2, 680);
  if (keyCode == 13) {
    sceneNum = 0;
  }
}

function mousePressed() {
  console.log("mouse being pressed?");
  console.log("newpress: " + newPress);
  if (mouseY >= height - 330 && mouseY <= height - 270 && newPress) {
    if (mouseX >= 390 && mouseX <= 450) { //remember
      console.log("player turn r key");
      bcell.useRememberMove();
      console.log("virus hp after bcell remember: " + virus.hP);
      if (virus.hP <= 0) {
        console.log("virus hp <= 0");
        for (let i = 0; i < carriers.length; i++) {
          carriers[i].x = random(width);
          carriers[i].y = random(height);
        }
        sceneNum = 8;
      } else if (bcell.hP <= 0) {
        sceneNum = 7;
      } else {
        sceneNum = 4;
      }
      keyCode = 0;
      let newTurn = new Turn();
      newTurn.setIdentity(1);
      turns.push(newTurn);
      newPress = false;
    }
    if (mouseX >= 320 && mouseX <= 380 && newPress) { //attack
      console.log("player turn a key");
      bcell.useAtkMove();
      // console.log("bcell has attacked");
      console.log("virus hp after bcell atk: " + virus.hP);
      if (virus.hP <= 0) {
        for (let i = 0; i < carriers.length; i++) {
          carriers[i].x = random(width);
          carriers[i].y = random(height);
        }
        sceneNum = 8;
      } else if (bcell.hP <= 0) {
        sceneNum = 7;
      } else {
        sceneNum = 4;
      }
      keyCode = 0;
      let newTurn = new Turn();
      newTurn.setIdentity(1);
      turns.push(newTurn); 
      newPress = false;
    }
  }
}
   
function victoryScreen() {
  image(victoryBackground, 0, 0);
  clearTurns();
  textFont('Courier New');
  textAlign(CENTER);
  textSize(30);
  textStyle(BOLD);
  text("Congratulations! You won.", width / 2, height / 7);
  textSize(20);
  if (player.age == 1) {
    text("Press ENTER to return to the mall", width / 2, height / 6 + 30);
  } else if (player.age == 2) {
    text("Press ENTER to return to work", width / 2, height / 6 + 30);
  } else {
    text("Press ENTER to return to school", width / 2, height / 6 + 30);
  }
  if (keyCode == 13) { // enter key
    sceneNum = player.age; // reset and start playing a new game
    battleSong.pause();
  }
} 

function defeatScreen() {
  image(titleScreenBackground, 0, 0);
  clearTurns();
  textFont('Courier New');
  textAlign(CENTER);
  textSize(40);
  textStyle(BOLD);
  text("You lost. Keep trying.", width / 2, height / 7);
  textSize(20);
  text("Press ENTER to play again", width / 2, height / 6 + 30);
  if (keyCode == 13) { // enter key
    sceneNum = 0; // reset and start playing a new game
  }
} 

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.age = Math.floor(random(1, 4));
    this.speed = this.age * 3;
    this.infected = false;
    this.vaccinated = false;
    this.apptTime = Math.floor(random(10, 13));
    this.safeScore = 0;
    this.size = 50;
    
    this.speedX = random(1, 3);
    this.speedY = random(1, 3);
    this.baseSpeedX = this.speedX;
    this.baseSpeedY = this.speedY;
  }
  
  show() {
    ellipse(this.x, this.y, this.size);
  }
  
  move() {
    // tried to make collision with obstacles; annoying to debug and time consuming so i stopped
    if (this.y > this.size && keyCode === UP_ARROW){ 
      this.y -= this.speed;
    } else if (this.x > this.size && keyCode === LEFT_ARROW) {
      this.x -= this.speed;
    } else if (this.x < width - this.size && keyCode === RIGHT_ARROW) {
      this.x += this.speed;
    } else if (this.y < height - this.size && keyCode === DOWN_ARROW) {
      this.y += this.speed;
    }
}
  
  updateScore() {
    if (minute % 10 == 0 && sceneNum > 0 && sceneNum < 4) {
      // score goes up by 100 at a time due to the frame refreshes but i don't have time to debug this thoroughly so i'm leaving it as it is
      this.safeScore++; 
    }
  }
}

class Carrier { // class for surrounding people
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.mask = Math.floor(random() * 2); // 0 for masked, 1 for unmasked
    this.size = 30;
    this.delta = Math.floor(random() * 2);//how to randomly make some true n some false?//we just have to add a random(1, 2)
    this.speedX = random(1, 2);
    this.speedY = random(1, 2);
    this.baseSpeedX = this.speedX;
    this.baseSpeedY = this.speedY;
  } 
  
  carrierShow() {
    if (this.mask == 1) {
      fill(360, 90, 90); // hsb red
      stroke(360, 90, 90);
    } else {
      fill(202, 90, 100); // hsb blue for masks!
      stroke(202, 90, 100);
    }
    ellipse(this.x, this.y, this.size + 20); // because six feet apart :D
    fill(100);
    stroke(0);
    ellipse(this.x, this.y, this.size);
  }
  
  carrierMove() { 
    if (this.mask == 1) {
      if (this.x < player.x && this.y < player.y) {
        this.x += this.speedX;
        this.y += this.speedY;
      } else if (this.x > player.x && this.y < player.y) {
        this.x -= this.speedX;
        this.y += this.speedY;
      } else if (this.x < player.x && this.y > player.y) {
        this.x += this.speedX;
        this.y -= this.speedY;
      } else if (this.x > player.x && this.y > player.y) {
        this.x -= this.speedX;
        this.y -= this.speedY;
      }
    } else {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x + this.size > width) {
        this.speedX = -1 * this.baseSpeedX;
      }
      if (this.x - this.size < 0) {
        this.speedX = this.baseSpeedX;
      }
      if (this.y + this.size > height) {
        this.speedY = -1 * this.baseSpeedY;
      }
      if (this.y - this.size < 0) {
        this.speedY = this.baseSpeedY;
      }
    }
  }
  
  checkCollisions() {
    if (this.mask > 0 && collideCircleCircle(this.x, this.y, this.size + 20, 
                            player.x, player.y, player.size)) {
      player.safeScore -= 1;
      sceneNum = 4; // sceneNum set to battle mode; should enter battle mode in next frame
      newBattle = true;
      introSong.pause();
    }
  }
}

class Icon {
  constructor(sceneNum, direction) {
    this.x = 0;
    this.y = height / 2;
    this.width = 0;
    this.height = 0;
    this.iconIdentity = sceneNum;
    this.direction = direction; // 0 for left icon, 1 for right icon
  }
  
  show() {
    if (this.iconIdentity == 1) {
      this.width = mallIconLeft.width;
      this.height = mallIconLeft.height;
      if (this.direction == 0) {
        image(mallIconLeft, this.x, this.y - (this.height / 2));
      } else {
        this.x = width - this.width;
        image(mallIconRight, this.x, this.y - (this.height / 2));
      }
    } else if (this.iconIdentity == 2) {
      this.width = workplaceLeft.width;
      this.height = workplaceLeft.height;
      if (this.direction == 0) {
        image(workplaceLeft, this.x, this.y - 2 * (this.height / 3)); // i plan on removing the chairs from the workplace map
      } else {
        this.x = width - this.width;
        image(workplaceRight, this.x, this.y - (this.height / 4));
      }
    } else if (this.iconIdentity == 3) {
      this.width = schoolTop.width;
      this.height = schoolTop.height;
      if (this.direction == 0) {
        image(schoolTop, this.x, this.y / 2);
      } else {
        this.y = (this.y / 2) + schoolTop.height;
        image(schoolBottom, this.x, this.y);
      }
    }
  }
  
}

class Bcell {
  constructor() {
    // this.moves = [];
    this.hP = 25;
    this.atk = 7;
    this.def = 0; // vaccine will give def
    this.buffs = []; // power-ups/vaccine
    this.usedMove = false;
  }
  
  show() {
    image(bCell, 0, height - 300);
  }
  
  displayhP() {
     fill('white');
     textSize(20);
     text(`HP: ${this.hP}`, 100, height - 300);
  }
  
  useAtkMove() {
    console.log("attacked?");
    let dmg = this.atk - virus.def;
    virus.hP -= dmg;
    bcell.turn = false;
    virus.turn = true;
  }
  
  useRememberMove() {
    this.atk += 5;
    bcell.turn = false;
    virus.turn = true;
  }
}

class Covid {
  constructor() {
    // this.moves = [];
    this.hP = 30;
    this.atk = 6;
    this.def = 2;
    this.variant = Math.floor(random() * 2); // 0 for normal, 1 for Delta
    this.turn = true;
  }
  
  show() {
    if (this.variant == 0) {
      redVirus.resize(300, 0);
      image(redVirus, width - 250, 200);
    } else {
      image(blueVirus, width - 250, 200);
    }
  }
  
  displayhP() {
    fill('white');
    textSize(20);
    text(`HP: ${this.hP}`, width - 200, height / 2);
  }
  
  useMove() {
    let dmg = this.atk - bcell.def;
    bcell.hP -= dmg;
  }
}

/* Displays and keeps track of the time in-game
*  Status: COMPLETED BUT STUCK IN MILITARY TIME AND THERE'S NOT ENOUGH TIME TO DEAL WITH IT
*/
function handleTime() {
  if (time < 3600000) { // one "time" is one minute so that many minutes will be from 6:00 AM in-game to 5:00 PM in-game
    if (time % 50 == 0) {
      minute++;
    } 
    if (minute % 60 == 0 && minute > 0) {
      hour++;
      minute = 0;
    }
    time++;
  } 
  if (sceneNum == 4) {
    fill(100);
  } else {
    fill(0);
  }
  noStroke();
  textSize(50);
  if (minute < 10) {
    text(`${hour}:0${minute}`, 70, 50);
  } else {
    text(`${hour}:${minute}`, 70, 50);
  }
}

function displayApptTime () {
  textSize(20);
  if (sceneNum == 4) {
    fill(100);
  } else {
    fill(0);
  }
  noStroke();
  text(`Appointment Time: ${player.apptTime}:00`, 155, 100);
}

function displayScore () {
  textSize(20);
  if (sceneNum == 4) {
    fill(100);
  } else {
    fill(0);
  }
  noStroke();
  let x = 65;
  if (player.safeScore % 100 == 0 && x > 65) {
    x += 13;
  }
  text(`Score: ${player.safeScore}`, x, 80);
}

function displayFroggerInstructions() {
  textSize(15);
  textAlign(CENTER);
  if (sceneNum == 1) {
    text(
      "Objective: Socially distance (and have fun)",
    width / 2, 120);
    text(
      "in the mall until your vaccine appointment.",
    width / 2, 140);
    text(
      "Blue radius indicate people who are masked and",
    width / 2, 160);
    text(
      "red radius indicate people who are unmasked!",
    width / 2, 180);
  } else if (sceneNum == 2) {
    text(
      "Objective: It's back to work—until your vaccine appointment.",
    width / 2, 120);
    text(
      "Blue radius indicate people who are masked and",
    width / 2, 140);
    text(
      "red radius indicate people who are unmasked!",
    width / 2, 160);
  } else if (sceneNum == 3) {
    text(
      "Objective: Today's your first day of school and",
    width / 2, 120);
    text(
      "the day of your first vaccine dose.",
    width / 2, 140);
    text(
      "Blue radius indicate classmates who are masked and",
    width / 2, 160);
    text(
      "red radius indicate classmates who are unmasked!",
    width / 2, 180);
  }
  //reset to normal?
  textSize(20)
  textAlign(LEFT);
}

function displayTurn() {
  textSize(30);
  fill(100);
  noStroke();
  let x = 80;
  if (turns % 100 == 0) {
    x += 40;
  }
  text(`Turn: ${turns.length}`, x, 80);
}

// i like the idea but idk if we have time to debug this
// function scoreRater () { 
//   if (player.safeScore == 5) {
//     text("Score rating: Good score! Keep it up.", 20, 60);
//   } else if (player.safeScore == 10) {
//     text("Score rating: Great score! Keep it up.", 20, 60);
//   } else if (player.safeScore == 15) {
//     text("Score rating: Amazing score! Keep it up.", 20, 60);
//   } 
// } 

// short-term powerups based on success (reaching certain scores)
/*
function speedUp () {
  if (safeScore >= 5 && safeScore < 7) {
    
  }
}

function invincible () {
  if (safeScore == 10 && collide) { // if collision happens, ignore;
  // collision decrements the score, so as a powerup, we want to
  // increment the score back, to have no change to the score
    safeScore++;
    // don't head to the battlefield as well:
    
  }
  
}
*/

/*
function checkWin() {
  // If the person reaches clinic w/o contact, increment the score
  if () { 
    safeScore++;
  }
}
*/

// good job! the buttons when clicked don't glitch anymore :)