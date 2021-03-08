// ==============
// Variable Setup
// ==============

var monSelector = "#mon";
var textSelector = "#text";
var allMons = new Array();
var theText = new Array();
var faded = true;
var position = 1;
var imgPosition = 1;
var count = 0;


// ===========
// Class Setup
// ===========
class MonInfo{
  constructor(selector, imgPath)
  {
    this.selector = selector;
    this.imgPath = imgPath;
  }

  get theSelector(){
    return this.selector;
  }

  get theImagePath(){
    return this.imgPath;
  }

  toString(){
    return this.selector + ":" + this.imgPath;
  }
}

class TheText{
  constructor(selector, text)
  {
    this.selector = selector;
    this.text = text;
  }

  get theSelector(){
    return this.selector;
  }

  get theText(){
    return this.text;
  }

  toString(){
    return this.selector + ":" + this.text;
  }
}

function initializeArray() {
  var mon = new MonInfo("#mon", "images/snivy.png");
  allMons.push(mon);
  var mon = new MonInfo("#mon", "images/tepig.png");
  allMons.push(mon);
  var mon = new MonInfo("#mon", "images/oshawott.webp");
  allMons.push(mon);
  var text = new TheText("#text", "<br><br><br><br>I want to be the very best like no one ever was. To catch them is my real test, to train them is my cause.");
  theText.push(text);
  var text = new TheText("#text", "<br><br><br><br>I will travel across the land, searching far and wide. Each Pokemon to understand the power that's inside.");
  theText.push(text);
  var text = new TheText("#text", "<br><br><br><br>Pokemon, gotta catch 'em all.");
  theText.push(text);
  togImg();
  moveImg();
}

// ========================================
// Document Ready Function and Button Click
// ========================================

$(document).ready(function(){
  console.log(allMons[count].toString());
  console.log(allMons[count].theSelector);
  console.log(theText[count].toString());
  console.log(theText[count].theSelector);

  $("button").click(function(){
    setTimeout(fadeImg, 0);
    setTimeout(moveSquare, 200);
    setTimeout(changeText, 500);
    if (count > 1) {
      count = 0;
    }
    else if (count <= 1){
      count++;
    }
    console.log(count);
  })

});

// ===============
// Other Functions
// ===============

// == Move the Square ==
function moveSquare(){
  if (position == 1) {
    $("#square").animate({left:"33.3%"});
    position = 2;
  }
  else if (position == 2) {
    $("#square").animate({left:"66.6%"});
    position = 3;
  }
  else if (position == 3) {
    $("#square").animate({left:"10px"});
    position = 1;
  }
}

// == Change the Text ==
function changeText(){
  document.getElementById("square").innerHTML = theText[count].text;
}

// == Toggles the Image ==
function togImg(){
  $("#mon").toggle();
}

// == Fades the Image ===
function fadeImg(){
  if (faded == true) {
    $(allMons[count].theSelector).fadeIn();
    faded = false;
  }
  else if (faded == false) {
    $(allMons[count].theSelector).fadeOut();
    faded = true;
    setTimeout(moveImg, 0);
  }
}

// == Moves the Image ==

function moveImg(){
  if (imgPosition == 1) {
    $("#mon").animate({left:"33.3%"});
    fadeImg();
    imgPosition = 2
  }
  else if (imgPosition == 2) {
    $("#mon").animate({left:"66.6%"});
    fadeImg();
    imgPosition = 3
  }
  else if (imgPosition == 3) {
    $("#mon").animate({left:"10px"});
    fadeImg();
    imgPosition = 1
  }
  setTimeout(changeImg, 500);
  console.log("Moved image.");
}

// == Changes the Image ==

function changeImg(){
  $(allMons[count].theSelector).attr("src", allMons[count].theImagePath);
}
