var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var patternCtx = canvas.getContext("2d");
var px = 0;
var py = canvas.height/2;
var patternWidth = 24;
var patternHeight = 24;
var img = document.getElementById("playerImg");
var img2 = document.getElementById("coinImg");
var img3 = document.getElementById("obsImg");
var pat = ctx.createPattern(img, "repeat");
var pat2 = ctx.createPattern(img2, "repeat");
var pat3 = ctx.createPattern(img3, "repeat");
var pObj;
var cObj1;
var cObj2;
var cObj3;
var oObj;
var musOn = false;
var coins = 0;
var health = 5;
var coinArray = [];
var obsArray = [];

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
    /*var didCollide = hasCollided(pObj, cObj1);
    if(didCollide){
      coins++;
      cObj1.col = true;
      document.getElementById("coins").innerHTML = coins;
      document.getElementById("myCanvas").style = "background-color: yellow;";
      setTimeout("returnColor();", 500);
    }*/
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
    py-=5;
}
function moveDown()
{
    py+=5;
}
function moveLeft()
{
    px-=5;
}
function moveRight()
{
    px+=5;
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

function drawStuff() {
  patternCtx.drawImage(img, px, py, patternWidth, patternHeight);

  $.getJSON("data/coinData.json",function(data) {
    for(var i = 0; i < data.coins.length; i++) {
      coinArray.push(new Coin(data.coins[i].x,data.coins[i].y,data.coins[i].w,data.coins[i].h,data.coins[i].c,data.coins[i].s))
    }
  })
  /*cObj1 = new Coin(c1x, c1y, patternWidth, patternHeight, false);
  patternCtx.drawImage(img2, c1x, c1y, patternWidth, patternHeight);
  cObj2 = new Coin(c2x, c2y, patternWidth, patternHeight, false);
  patternCtx.drawImage(img2, c2x, c2y, patternWidth, patternHeight);
  cObj3 = new Coin(c3x, c3y, patternWidth, patternHeight, false);
  patternCtx.drawImage(img2, c3x, c3y, patternWidth, patternHeight);*/
}

function update()
{
  pObj = new Player(px, py, patternWidth, patternHeight, img);
  ctx.clearRect(0,0,1000,1000);
  drawSquare();
  drawCoins();
}

function drawSquare() {
  /*if (cObj1.col = true) {

  }
  else if (cObj1.col = false) {
    patternCtx.drawImage(img2, c1x, c1y, patternWidth, patternHeight);
  }
  if (cObj2.col = true) {

  }
  else if (cObj2.col = false) {
    patternCtx.drawImage(img2, c2x, c2y, patternWidth, patternHeight);
  }
  if (cObj3.col = true) {

  }
  else if (cObj3.col = false) {
    patternCtx.drawImage(img2, c3x, c3y, patternWidth, patternHeight);
  }*/

  if (px >= (canvas.width - 20)) {
    px-=5;
    patternCtx.drawImage(img, px, py, patternWidth, patternHeight);}
  else if (px < (canvas.width - canvas.width)) {
    px+=5;
    patternCtx.drawImage(img, px, py, patternWidth, patternHeight);
  }

  else if (py >= (canvas.height - 20)) {
    py-=5;
    patternCtx.drawImage(img, px, py, patternWidth, patternHeight);}
  else if (py < (canvas.height - canvas.height)) {
    py+=5;
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
      patternCtx.drawImage(coinArray[i].s, coinArray[i].x, coinArray[i].y, coinArray[i].w, coinArray[i].h);
        //ctx.fillRect(squareArray[i].x, squareArray[i].y, squareArray[i].width, squareArray[i].height);
    }
}
