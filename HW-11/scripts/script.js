var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var patternCtx = canvas.getContext("2d");
var px = 0;
var py = canvas.height/2;
var patternWidth = 48;
var patternHeight = 48;
var img = document.getElementById("playerImg");
var img2 = document.getElementById("coinImg");
var img3 = document.getElementById("obstacle");
var pat = ctx.createPattern(img, "repeat");
var pat2 = ctx.createPattern(img2, "repeat");
var pat3 = ctx.createPattern(img3, "repeat");
var pObj;
var cObj;
var oObj;
var musOn = false;
var coins = 0;
var health = 5;
var coinArray = [];
var obsArray = [];
var sprC = 0;
var amount = 8;
var amount2 = 8;

// ===================
// Key Press Functions
// ===================
$(document).ready(function(){
    $(this).keypress(function(event){
        getKey(event);
    });
});

function getKey(event)
{
    var char = event.which || event.keyCode;
    var actualLetter = String.fromCharCode(char);

    if(actualLetter == "w")
    {
        moveUp();
    }
    if(actualLetter == "s")
    {
        moveDown();
    }
    if(actualLetter == "a")
    {
        moveLeft();
    }
    if(actualLetter == "d")
    {
        moveRight();
    }
    drawSquare();
    update();
}

function moveUp()
{
    py-=16;
}
function moveDown()
{
    py+=16;
}
function moveLeft()
{
    px-=16;
}
function moveRight()
{
    px+=16;
}

class Player{
    constructor(x, y, height, width, color)
    {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
    }

    setX(x)
    {
       this.x = x;
    }
    setY(y)
    {
       this.y = y;
    }
    setHeight(height)
    {
       this.height = height;
    }
    setWidth(width)
    {
       this.width = width;
    }
    setColor(color)
    {
        this.color = color;
    }
    get theX()
    {
        return this.x;
    }
    get theY()
    {
        return this.y;
    }
    get theHeight()
    {
        return this.height;
    }
    get theWidth()
    {
        return this.width;
    }
    get theColor()
    {
        return this.color;
    }
}

// ==============
// Draw Functions
// ==============

$(function() {
  $.getJSON("data/coinData.json",function(data) {
    for(var i = 0; i < data.coins.length; i++) {
      coinArray.push(new Coin(data.coins[i].x,data.coins[i].y,data.coins[i].w,data.coins[i].h,data.coins[i].c,data.coins[i].s))
    }
  });
  $.getJSON("data/obsData.json",function(data) {
    for(var i = 0; i < data.obs.length; i++) {
      obsArray.push(new Obstacle(data.obs[i].x,data.obs[i].y,data.obs[i].w,data.obs[i].h,data.obs[i].d,data.obs[i].s))
    }
  });
});

function drawStuff() {
  setInterval(update,1000/30);
  //setInterval(updateSprites,1000);
}

function update()
{
  pObj = new Player(px, py, patternWidth, patternHeight, img);
  ctx.clearRect(0,0,1000,1000);
  drawSquare();
  drawCoins();
  drawObs();

  for(let i = 0; i < coinArray.length; i++) {
    cObj = coinArray[i];
    var didCollide = hasCollided(pObj,cObj);
    if(didCollide){
      coins++;
      coinArray[i].setX(1000);
      document.getElementById("coins").innerHTML = coins;
      document.getElementById("myCanvas").style = "background-color: cyan;";
      setTimeout("returnColor();", 500);
    }
    if (coins == 3) {
      window.alert('Congratulations, you win! Click "OK" to restart.');
      window.location = "index.html";
    }
  }
  for(let i = 0; i < obsArray.length; i++) {
    oObj = obsArray[i];
    var didCollide = hasCollided(oObj,pObj);
    if(didCollide){
      health--;
      px = 0;
      py = canvas.height/2;
      document.getElementById("hp").innerHTML = health;
      document.getElementById("myCanvas").style = "background-color: red;";
      setTimeout("returnColor();", 500);
    }
    if (health == 0) {
      window.alert('You died! Click "OK" to try again.');
      window.location = "index.html";
    }
  }
}

function drawSquare() {

  if (px >= (canvas.width - 48)) {
    px-=8;}
  else if (px < (canvas.width - canvas.width)) {
    patternCtx.drawImage(img, px, py, patternWidth, patternHeight);
    px+=8;
    patternCtx.drawImage(img, px, py, patternWidth, patternHeight);
  }

  else if (py >= (canvas.height - 48)) {
    py-=8;
    patternCtx.drawImage(img, px, py, patternWidth, patternHeight);}
  else if (py < (canvas.height - canvas.height)) {
    py+=8;
    patternCtx.drawImage(img, px, py, patternWidth, patternHeight);
  }
  else {
    patternCtx.drawImage(img, px, py, patternWidth, patternHeight);}
}

function hasCollided(object1, object2) {
    return !(
        ((object1.y + object1.height) < (object2.y)) ||
        (object1.y > (object2.y + object2.height)) ||
        ((object1.x + object1.width) < object2.x) ||
        (object1.x > (object2.x + object2.width))
    );
}

function toggleMusic() {
  if (musOn == true) {
    document.getElementById("song").src = "";
    document.getElementById("mute").innerHTML = "Unmute Music";
    musOn = false;
  }
  else if (musOn == false) {
    document.getElementById("song").src = "audio/music.wav";
    document.getElementById("mute").innerHTML = "Mute Music";
    musOn = true;
  }
}

function returnColor(){
  document.getElementById("myCanvas").style = "background-color: white;";
}

function drawCoins(){
  for(var i = 0; i < coinArray.length; i++)
    {
      patternCtx.drawImage(img2, coinArray[i].theX, coinArray[i].theY, coinArray[i].theWidth, coinArray[i].theHeight);
    }
}

function drawObs(){
  moveObs();
  for(var i = 0; i < obsArray.length; i++)
    {
      patternCtx.drawImage(img3, obsArray[i].theX, obsArray[i].theY, obsArray[i].theWidth, obsArray[i].theHeight);
    }
}

function updateSprites(){
  if (sprC = 0) {
    document.getElementById("obstacle").src = "../images/obstacle2.png";
    img3 = document.getElementById("obstacle");
    sprC = 1;
    console.log(sprC);
  }
  else if (sprC = 1) {
    document.getElementById("obstacle").src = "../images/obstacle.png";
    img3 = document.getElementById("obstacle");
    sprC = 0;
    console.log(sprC);
  }

}

// ==============
// Move Obstacles
// ==============

function moveObs() {

  for(let i = 0; i < obsArray.length; i++)
  {
    if(obsArray[i].theDir == 0)
    {
        // move down
        obsArray[i].setY(obsArray[i].theY + amount);
        if(obsArray[i].theY < 0 || obsArray[i].theY > 388)
        {
          amount *=1;
        }
    }
    else if(obsArray[i].theDir == 1)
    {
        // move up
        obsArray[i].setY(obsArray[i].theY - amount);
        if(obsArray[i].theY < 0 || obsArray[i].theY > 388)
        {
          amount *=-1;
        }
    }
    else if(obsArray[i].theDir == 2)
    {
      // move left
      obsArray[i].setX(obsArray[i].theX - amount);
      if(obsArray[i].theX < 0 || obsArray[i].theX > 630)
      {
        amount2 *=-1;
      }
    }
    else if(obsArray[i].theDir == 3)
    {
      // move right
      obsArray[i].setX(obsArray[i].theX + amount);
      if(obsArray[i].theX < 0 || obsArray[i].theX > 630)
      {
        amount2 *=1;
      }
    }
  }
}
