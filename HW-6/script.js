// ====================
// Variable Declaration
// ====================

var imageTags = ["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10"];

var blankImagePath = "images/nothinghere.png";

var actualImages = new Array();

var firstNumber = -1;

var secondNumber = -1;

var attempts = 0;

var correctGuesses = 0;

// ==========================
// JSON Declaration Goes Here
// ==========================

var player = {"firstName": "", "lastName":"", "age":"", "attempts":""};

// =====================
// Print the Blank Cards
// =====================

function printBlanks() {
    createRandomImageArray();
    for(var i = 0; i < imageTags.length; i++)
    {
        document.getElementById(imageTags[i]).src= blankImagePath;
    }
}

// ====================
// Randomize the Images
// ====================

function createRandomImageArray() {
    var actualImagePath = ["images/dragon.png", "images/fairy.png", "images/fire.png", "images/grass.png", "images/water.png"];
    var count = [0,0,0,0,0,0,0,0,0,0];
    while(actualImages.length < 10) {
        var randomNumber = Math.floor(Math.random() * actualImagePath.length);
        if(count[randomNumber] < 2) {
            actualImages.push(actualImagePath[randomNumber]);
            count[randomNumber] = count[randomNumber] + 1;
        }
    }
}

// ===============
// Flip the Images
// ===============

function flipImage(number) {
    // ===sets images===
    if(firstNumber >= 0) {
      secondNumber = number;
      document.getElementById(imageTags[number]).src = actualImages[secondNumber];
      attempts = attempts + 1;
      console.log("Tries: " + attempts);
    }
    else if(firstNumber < 0) {
      firstNumber = number;
      document.getElementById(imageTags[firstNumber]).src = actualImages[firstNumber];
    }
    // ===Check if images match here===
    if(actualImages[secondNumber] != actualImages[firstNumber] && firstNumber >= 0 && secondNumber >= 0){
      setTimeout(imageWipe, 1000);
    }
    else if(actualImages[secondNumber] == actualImages[firstNumber] && firstNumber >= 0 && secondNumber >= 0) {
      firstNumber = -1;
      secondNumber = -1;
      correctGuesses = correctGuesses + 1;
      console.log("Correct: " + correctGuesses);
      if (correctGuesses >= 5) {
        player.attempts = attempts;
        setTimeout(goResults, 3000);
      }
    }
}

// ====================
// Wipe a Flipped Image
// ====================

function imageWipe() {
  document.getElementById(imageTags[firstNumber]).src = blankImagePath;
  document.getElementById(imageTags[secondNumber]).src = blankImagePath;
  firstNumber = -1;
  secondNumber = -1;
}

// ======================
// Go to the Results Page
// ======================

function goResults() {
  window.location = "results.html";
}

// ================
// Restart the Game
// ================

function restartGame() {
  window.location = "index.html";
}

// =====================================
// Get the Player's Info from Intro Page
// =====================================

function addPlayer() {
  var firstName = document.getElementById("name1").value;
  player.firstName = firstName;
  console.log(firstName);
  var lastName = document.getElementById("name2").value;
  player.lastName = lastName;
  console.log(lastName);
  var age = document.getElementById("ageTxt").value;
  player.age = age;
  console.log(age);
  localStorage.setItem("playerInfo", JSON.stringify("player"));
  window.location = "game.html";
}

// ======================
// Get Info from the JSON
// ======================

function playerInfo(){
  var playerInformation = localStorage.getItem("playerInfo");
  player = JSON.parse(playerInformation);
}

// ==================================
// Get the Result Info and display it
// ==================================

function addResults() {
  playerInfo();
  document.getElementById("fN").innerHTML = firstName;
  document.getElementById("lN").innerHTML = lastName;
  document.getElementById("ageVal").innerHTML = age;
  document.getElementById("tries").innerHTML = attempts;
  if (attempts >= 11) {
    document.getElementById("comment").innerHTML = "You can do a bit better than that!";
  }
  else if (attempts >= 6) {
    document.getElementById("comment").innerHTML = "Hey, not too shabby!";
  }
  else if (attempts == 5) {
    document.getElementById("comment").innerHTML = "Wow! That's insanely lucky!";
  }
  else if (attempts < 5) {
    document.getElementById("comment").innerHTML = "Turns out, you're a cheater. Sheesh.";
  }
}
