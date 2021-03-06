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
      setTimeout(imageWipe, 500);
    }
    else if(actualImages[secondNumber] == actualImages[firstNumber] && firstNumber >= 0 && secondNumber >= 0) {
      firstNumber = -1;
      secondNumber = -1;
      correctGuesses = correctGuesses + 1;
      console.log("Correct: " + correctGuesses);
      if (correctGuesses >= 5) {
        var player = playerInfo();
        player.attempts = attempts;
        localStorage.setItem("playerInfo", JSON.stringify(player));
        setTimeout(goResults, 2000);
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
  var lastName = document.getElementById("name2").value;
  player.lastName = lastName;
  var age = document.getElementById("ageTxt").value;
  player.age = age;
  console.log(age);
  localStorage.setItem("playerInfo", JSON.stringify(player));
  console.log("Uh oh?");
  console.log(player.firstName);
  console.log(player.lastName);
  console.log(player.age);
  window.location = "game.html";
}

// ======================
// Get Info from the JSON
// ======================

function playerInfo() {
  var playerInformation = localStorage.getItem("playerInfo");
  let player = JSON.parse(playerInformation);
  console.log(player);
  return player;
}

// ==================================
// Get the Result Info and display it
// ==================================

function addResults() {
  let player = playerInfo();
  console.log(player.firstName);
  console.log(player.lastName);
  console.log(player.age);
  console.log(player.attempts);
  document.getElementById("fN").innerHTML = player.firstName;
  document.getElementById("lN").innerHTML = player.lastName;
  document.getElementById("ageVal").innerHTML = player.age;
  document.getElementById("tries").innerHTML = player.attempts;
  if (player.attempts >= 11) {
    document.getElementById("comment").innerHTML = "You can do a bit better than that!";
  }
  else if (player.attempts >= 6) {
    document.getElementById("comment").innerHTML = "Hey, not too shabby!";
  }
  else if (player.attempts == 5) {
    document.getElementById("comment").innerHTML = "Wow! That's insanely lucky!";
  }
  else if (player.attempts < 5) {
    document.getElementById("comment").innerHTML = "Turns out, you're a cheater. Sheesh.";
  }
}
