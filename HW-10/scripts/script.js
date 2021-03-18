var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var patternCtx = canvas.getContext("2d");
var px = 0;
var py = canvas.height/2;
var ex = canvas.width/2;
var ey = 50;
var ed = 1;
var patternWidth = 40;
var patternHeight = 40;
var img = document.getElementById("playerImg");
var img2 = document.getElementById("enemyImg");
var pat = ctx.createPattern(img, "repeat");
var pat2 = ctx.createPattern(img2, "repeat");
var pObj;
var eObj;
var musOn = false;
var hits = 0;

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
    var didCollide = hasCollided(pObj, eObj);
    if(didCollide){
      px = 0;
      py = canvas.height/2;
      ex = canvas.width/2;
      ey = 50;
      ed = 1;
      hits++;
      if (patternWidth <= 10) {
        patternWidth = 10;
        patternHeight = 10;
      }
      else {
        patternWidth -= 5;
        patternHeight -= 5;
      }
      document.getElementById("hits").innerHTML = hits;
      document.getElementById("myCanvas").style = "background-color: red;";
      setTimeout("returnColor();", 500);
    }
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
    drawEnemy();
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

class Sprite{
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

  patternCtx.drawImage(img2, ex, ey, patternWidth, patternHeight);
  setInterval(drawEnemy, 3000/60);
}

function update()
{
  pObj = new Sprite(px, py, patternWidth, patternHeight, img);
  eObj = new Sprite(ex, ey, patternWidth, patternHeight, img2);
  ctx.clearRect(0,0,1000,1000);
  drawSquare();
}

function drawSquare() {
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

function drawEnemy() {
  update();
  ed = Math.floor((Math.random() * 4) + 1);
  if (ed == 1) {
    ex+=5;
  }
  else if (ed == 2) {
    ex-=5;
  }
  else if (ed == 3) {
    ey+=5;
  }
  else if (ed == 4) {
    ey-=5;
  }

  if (ex >= (canvas.width - patternWidth)) {
    ex-=5;
    patternCtx.drawImage(img2, ex, ey, patternWidth, patternHeight);}
  else if (ex < (canvas.width - canvas.width)) {
    ex+=5;
    patternCtx.drawImage(img2, ex, ey, patternWidth, patternHeight);
  }

  else if (ey >= (canvas.height - patternHeight)) {
    ey-=5;
    patternCtx.drawImage(img2, ex, ey, patternWidth, patternHeight);}
  else if (ey < (canvas.height - canvas.height)) {
    ey+=5;
    patternCtx.drawImage(img2, ex, ey, patternWidth, patternHeight);
  }
  else {
    patternCtx.drawImage(img2, ex, ey, patternWidth, patternHeight);}
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
