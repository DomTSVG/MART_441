// ================
// Set up variables
// ================

// Item Array
var items = [
  {"Name": "Stimpak", "Type": "Med", "Bonus": 0, "inv": 0, "cost": 10, "path": '<img class="itemImg" src="./images/stimpak.png" alt="">'},
  {"Name": "Leather Armor", "Type": "Armor", "Bonus": 1, "inv": 0, "cost": 50, "path": '<img class="itemImg" src="./images/larmor.png" alt="">'},
  {"Name": "Combat Armor", "Type": "Armor", "Bonus": 3, "inv": 0, "cost": 150, "path": '<img class="itemImg" src="./images/carmor.png" alt="">'},
  {"Name": "Ammo", "Type": "Ammo", "Bonus": 0, "inv": 0, "cost": 10, "path": '<img src="" alt="">'},
  {"Name": "Energy Ammo", "Type": "Ammo", "Bonus": 0, "inv": 0, "cost": 10, "path": '<img src="" alt="">'},
  {"Name": "Baseball Bat", "Type": "Melee", "Bonus": 1, "inv": 0, "path": '<img class="itemImg" src="./images/bat.png" alt="">'},
  {"Name": "Hydrant Bat", "Type": "Melee", "Bonus": 2, "inv": 0, "path": '<img class="itemImg" src="./images/hydrant.png" alt="">'},
  {"Name": "10mm Pistol", "Type": "Gun", "Bonus": 2, "inv": 0, "path": '<img class="itemImg" src="./images/10mm.png" alt="">'},
  {"Name": "Assault Rifle", "Type": "Gun", "Bonus": 3, "inv": 0, "path": '<img class="itemImg" src="./images/ar.png" alt="">'},
  {"Name": "Laser Pistol", "Type": "Energy", "Bonus": 2, "inv": 0, "path": '<img class="itemImg" src="./images/laserp.png" alt="">'},
  {"Name": "Laser Rifle", "Type": "Energy", "Bonus": 3, "inv": 0, "path": '<img class="itemImg" src="./images/lrifle.png" alt="">'},
  {"Name": "Unarmed", "Type": "Melee", "Bonus": 0, "inv": 0, "path": '<img src="" alt="">'},
  {"Name": "No Armor", "Type": "Armor", "Bonus": 0, "inv": 0, "path": '<img src="" alt="">'},
];

// == Player Variables ==
var pName; // Player Name
var pExp = 0; // Player experience
var pLevel = 1; // Player Level
var pStr = 1; // Strength
var pPer = 1; // Perception
var pEnd = 1; // Endurance
var pCha = 1; // Charisma
var pInt = 1; // Intelligence
var pAgi = 1; // Agility
var pLck = 1; // Luck
var pHitPoints = pEnd * 5; // Player Max HP
var pCurHP = 0;
var pCaps = 0; // Caps count (money)
var pInv; // Inventory (?)
var pWeapon = items[11]; // Weapon
var pArmor = items[12]; // Armor
var pPerk1; // Perk slot 1
var pPerk2; // Perk slot 2
var pPerk3; // Perk slot 3
var pDam; // Damage
var pDamDone; // Damage done last turn
var pCrit = (pLck/10); // Critical Chance
var pCritical; // Critical value
var pCritHit = false; // Checks if crit was hit
var pDiscount = 0; // Store Discount
var pAcc = 75; //Current Player Accuracy out of 100
var pHit; // Rolled accuracy check
var pRed; // Player Damage Reduction

// Level up
var toL2 = 10;
var toL3 = 50;
var toNext;

// Enemy variables
var eSelect; // Random enemy selector
var enemy; // Enemy type
var eHitPoints; // Enemy HP
var eDam; // Enemy Damage
var eCaps; // Enemy caps drop
var eItem; // Enemy item drop
var eRate; // Enemy item drop rate
var eHit; // Enemy accuracy check

// Text and Other Variables
var sPoints = 5; // Spec points left
var run; // Run roll handler
var inCombat = false; // Is player in combat?
var noItemUse = false; // Can items be used?
var hasRested = false; // Has player rested this visit?
var pCapsLost; // Caps lost when you lost last.

// Perk list
var perks = [
  {"Name": "Big Leagues", "Text": "Swing for the fences! You permanently gain +1 melee damage.", "Slot": "<span class='clickable' onclick='window.alert(perks[0].Text)'>Big Leagues</span>"},
  {"Name": "Awareness", "Text": "You have keen senses and have +5% accuracy with all weapons.", "Slot": "<span class='clickable' onclick='window.alert(perks[1].Text)'>Awareness</span>"},
  {"Name": "Toughness", "Text": "At the very least you can take a beating. +1 to damage reduction.", "Slot": "<span class='clickable' onclick='window.alert(perks[2].Text)'>Toughness</span>"},
  {"Name": "Silver Tongue", "Text": "Your silver tongue allows you to get 10% better prices at shops.", "Slot": "<span class='clickable' onclick='window.alert(perks[3].Text)'>Silver Tongue</span>"},
  {"Name": "Science!", "Text": "The power of science is staggering! Permanently gain +1 energy weapon damage.", "Slot": "<span class='clickable' onclick='window.alert(perks[4].Text)'>Science!</span>"},
  {"Name": "Gunslinger", "Text": "No one should try to match your permanent +1 to damage with guns.", "Slot": "<span class='clickable' onclick='window.alert(perks[5].Text)'>Gunslinger</span>"},
  {"Name": "Finesse", "Text": "Your smooth moves give you an additional +10% chance for a critical.", "Slot": "<span class='clickable' onclick='window.alert(perks[6].Text)'>Finesse</span>"}
];



// Enemy Array
var enemies = [
  {"Name": "Radroach", "HP": 2, "Damage": 1, "Item": items[5], "Caps": 3, "Exp": 1,  "path": '<img src="./images/radroach.png" alt="">', "textIn": '<p>While rummaing through an unpicked dumpster a filthy radroach crawls out of the pile, ready to attack.</p>', "textAttack": "<p>The roach bites at you for <span class='damage' id='enemyDamage'>0</span> damage. <span class='damage' id='critDam'></span></p>", "textMiss": "<p>You quickly step out of the way of the radroach's attack. (Miss!)</p>"},
  {"Name": "Mole Rat", "HP": 3, "Damage": 2, "Item": items[9], "Caps": 5, "Exp": 2,  "path": '<img src="./images/molerat.png" alt="">', "textIn": '<p>You are looking through an abandoned picnic area when you hear something burst from the ground, and a filthy mole rat appears in front of you and attacks!</p>', "textAttack": "<p>It bites at your legs for <span class='damage' id='enemyDamage'>0</span> damage. <span class='damage' id='critDam'></span></p>", "textMiss": "<p>It goes for a bite, but you manage to kick it away. (Miss!)</p>"},
  {"Name": "Ghoul", "HP": 3, "Damage": 2, "Item": items[7], "Caps": 5, "Exp": 2,  "path": '<img src="./images/ghoul.png" alt="">', "textIn": '<p>On the lonely street of a nearby town, an irradiated, feral ghoul wanders out of one of the destroyed buildings. It growls at you, and charges!</p>', "textAttack": "<p>It leaps at you, hitting you for <span class='damage' id='enemyDamage'>0</span> damage. <span class='damage' id='critDam'></span></p>", "textMiss": "<p>It takes a swing at you with its arms, but it swings wide. (Miss!)</p>"},
  {"Name": "Raider", "HP": 5, "Damage": 3, "Item": items[8], "Caps": 10, "Exp": 4,  "path": '<img src="./images/raider.png" alt="">', "textIn": '<p>As you wander the wastes searching for someplace to loot through, you are jumped by a crazy looking human in scrap armor. A raider has beset you!</p>', "textAttack": "<p>The raider fires his gun at you, hitting you for <span class='damage' id='enemyDamage'>0</span> damage. <span class='damage' id='critDam'></span></p>", "textMiss": "<p>He takes a swing at you with a knife, but you quickly backstep. (Miss!)</p>"},
  {"Name": "Mr. Handy", "HP": 6, "Damage": 3, "Item": items[0], "Caps": 30, "Exp": 4,  "path": '<img src="./images/handy.png" alt="">', "textIn": '<p>Inside a ruined office building you enter a large office, only to be greeted by a still-functional Mr. Handy robot, though it seems to be in some disrepair. "Welcome back sir, Miss Briggs has a memo for you. She wants you to fil-add-ma-ma-ma- *zzrt* ...die." You sigh. Just another day at the office.</p>', "textAttack": "<p>The robot yells 'tally-ho!' and slashes at you with its buzz-saw for <span class='damage' id='enemyDamage'>0</span> damage. <span class='damage' id='critDam'></span></p>", "textMiss": "<p>As it attempts to roast you with its flamer, it bugs out and says 'sorry, I'm having an off day'. Don't we all sometimes? (Miss!)</p>"},
  {"Name": "Radscorpion", "HP": 6, "Damage": 3, "Item": items[6], "Caps": 20, "Exp": 5,  "path": '<img src="./images/radscorpion.png" alt="">', "textIn": "<p>You've come across an old gas station, which seems ripe for some scavving. As you approach though, you hear a spine chilling noise and clicking. Out from behind the station wanders a deadly radscorpion, and it scurries towards you.</p>", "textAttack": "<p>The radscorpion stings you, causing <span class='damage' id='enemyDamage'>0</span> points of damage to spread through your veins. <span class='damage' id='critDam'></span></p>", "textMiss": "<p>It attempts to sting you, but you knock away the stinger as it approaches. (Miss!)</p>"},
  {"Name": "Brotherhood Knight", "HP": 8, "Damage": 4, "Item": items[10], "Caps": 40, "Exp": 6,  "path": '<img src="./images/bos.png" alt="">', "textIn": "<p>You've found yourself in an old pre-war tech museum. It's hardly been picked, and there's a lot of good scrap here. You quickly find out, though, that you aren't the only one here interested in it. This power-armor clad person raises their weapon at you, and yells. 'Stay out of Brotherhood business, scavver!' Looks like you've got a fight on your hands.</p>", "textAttack": "<p>Your opponent shoots you with his laser rifle, singing you for <span class='damage' id='enemyDamage'>0</span> damage. <span class='damage' id='critDam'></span></p>", "textMiss": "<p>He fires at you with his Laser Rifle, but you duck into cover. (Miss!)</p>"},
  {"Name": "Deathclaw", "HP": 10, "Damage": 5, "Item": items[0], "Caps": 100, "Exp": 10, "path": '<img src="./images/deathclaw.png" alt="">', "textIn": "<p>You're out and scavenging through a ruined building, full of skeletons. You wonder why so many people died here, of all places, but then as you're picking through a suitcase you hear a noise from behind you. You turn around and come face to face with the reason; a deathclaw. The most savage creature of the wasteland is now bearing down on you, ready to make another corpse.</p>", "textAttack": "<p>The deathclaw rakes you with its claws for <span class='damage' id='enemyDamage'>0</span> damage. <span class='damage' id='critDam'></span></p>", "textMiss": "<p>As the deathclaw is charging you manage to dive out of the way, just in time. (Miss!)</p>"},
];

// ================


// ===============
// Onload Function
// ===============

function onLoad() {
  noItemUse = true;
  clearAlert();
}

// ===============

// =========
// Functions
// =========

// ==Clear Alert==

function clearAlert() {
  document.getElementById('alert').style.visibility = "hidden";
  document.getElementById('alert').innerHTML = '';
}

// ==Show Alert==

function showAlert() {
  document.getElementById('alert').style.visibility = "visible";
}

// ==Stat Refresh==

function statRefresh() {
  pHitPoints = pEnd * 5;
  // Check for Silver Tongue
  if (pPerk1 == perks[3] || pPerk2 == perks[3] || pPerk3 == perks[3]) {
    pDiscount = (pCha*10);
  }
  else {
    pDiscount = ((pCha*10)-10);
  }
  // Check for Toughness
  if (pPerk1 == perks[2] || pPerk2 == perks[2] || pPerk3 == perks[2]) {
    pRed = (pArmor.Bonus + 1);
  }
  else {
    pRed = (pArmor.Bonus);
  }
  // Base Damage Calculator
  if (pWeapon.Type == "Gun") {
    // Check for Gunslinger
    if (pPerk1 == perks[5] || pPerk2 == perks[5] || pPerk3 == perks[5]) {
      pDam = pAgi + pWeapon.Bonus + 1;
    }
    else {
      pDam = pAgi + pWeapon.Bonus;
    }
  }
  else if (pWeapon.Type == "Energy") {
    // Check for Science!
    if (pPerk1 == perks[4] || pPerk2 == perks[4] || pPerk3 == perks[4]) {
      pDam = pInt + pWeapon.Bonus + 1;
    }
    else {
      pDam = pInt + pWeapon.Bonus;
    }
  }
  else {
    // Check for Big Leagues
    if (pPerk1 == perks[0] || pPerk2 == perks[0] || pPerk3 == perks[0]) {
      pDam = pStr + pWeapon.Bonus + 1;
      console.log("got big league bonus");
    }
    else {
      pDam = pStr + pWeapon.Bonus;
    }
  }
  // Check for Finesse perk
  if (pPerk1 == perks[6] || pPerk2 == perks[6] || pPerk3 == perks[6]) {
    pCrit = 0.1 + (pLck/10);
  }
  else {
    pCrit = (pLck/10);
  }
  document.getElementById('experience').innerHTML = pExp;
   if (pLevel == 2) {
    toNext = (toL3 - pExp);
    document.getElementById('expNext').innerHTML = toNext;
  }
  else if (pLevel == 3) {
    document.getElementById('expNext').innerHTML = "Max Level";
  }
  else {
    toNext = (toL2 - pExp);
    document.getElementById('expNext').innerHTML = toNext;
  }
  // Perk Add Info Display Updater
  document.getElementById('level').innerHTML = pLevel;
  document.getElementById('hp').innerHTML = pHitPoints;
  document.getElementById('curHP').innerHTML = pCurHP;
  document.getElementById('caps').innerHTML = pCaps;
  document.getElementById('armor').innerHTML = pArmor.Name;
  //document.getElementById('weapon').innerHTML = pWeapon.Name;

  console.log(pWeapon);
  console.log(pWeapon.Type)

}

// ==================
// ==Combat Handler==
// ==================

function goCombat() {
  clearAlert();
  hasRested = false;
  noItemUse = true;
  if (pLevel == 1) {
    eSelect = Math.floor(Math.random() * 3);
    console.log("Rolled: " + eSelect);
  }
  else if (pLevel == 2) {
    eSelect = Math.floor(Math.random() * 6);
    console.log("Rolled: " + eSelect);
  }
  else if (pLevel == 3) {
    eSelect = Math.floor(Math.random() * 8);
    console.log("Rolled: " + eSelect);
  }
  enemy = enemies[eSelect];
  eHitPoints = enemy.HP;
  eDam = enemy.Damage;
  eCaps = enemy.Caps;
  eItem = enemy.Item;
  eRate = 50;
  pAcc = 75 + (pPer*5);
  document.getElementById('image').innerHTML = enemy.path + "You are fighting a " + enemy.Name + ".";
  document.getElementById('story').innerHTML = enemy.textIn;
  document.getElementById('choice').innerHTML = "<p><button onclick='attackAction();'>Attack with your " + pWeapon.Name + "</button></p><p><button onclick='runAction();'>Run</button></p>";
}

function attackAction() {
  // Player Attack
  clearAlert();
  console.log(pWeapon.Type);
  pHit = Math.floor(Math.random() * 101);
  if (pHit < pAcc) {
    // HAVE AMMO
    // ====================GUN USE======================
    if (pWeapon.Type == "Gun" && items[3].inv !== 0) {
      pCritical = (Math.random()) + pCrit;
      console.log("Rolled " + pCritical + " for a crit.");
      if (pCritical >= 1) {
        pCritHit = true;
      }
      else {
        pCritHit = false;
      }
      if (pCritHit == true) {
        pDamDone = ((pDam)*2);
        eHitPoints -= pDamDone;
      }
      else {
        pDamDone = (pDam);
        eHitPoints -= pDamDone;
      }
      document.getElementById('combat').innerHTML = "<p>You shoot the " + enemy.Name + " for <span class='damage'>" + pDamDone + "</span> damage!";
      if (pCritHit == true) {
        document.getElementById('combat').innerHTML = document.getElementById('combat').innerHTML + "<span class='damage'>CRITICAL HIT!!</span></p>";
      }
      else {
        document.getElementById('combat').innerHTML = document.getElementById('combat').innerHTML + "</p>";
      }
      useAmmo();
    }
    // ======================ENERGY USE=========================
    else if (pWeapon.Type == "Energy" && items[4].inv !== 0) {

      pCritical = (Math.random()) + pCrit;
      console.log("Rolled " + pCritical + " for a crit.");
      if (pCritical >= 1) {
        pCritHit = true;
      }
      else {
        pCritHit = false;
      }
      if (pCritHit == true) {
        pDamDone = ((pDam)*2);
        eHitPoints -= pDamDone;
      }
      else {
        pDamDone = (pDam);
        eHitPoints -= pDamDone;
      }
      document.getElementById('combat').innerHTML = "<p>You blast the " + enemy.Name + " for <span class='damage'>" + pDamDone + "</span> damage!";
      if (pCritHit == true) {
        document.getElementById('combat').innerHTML = document.getElementById('combat').innerHTML + "<span class='damage'>CRITICAL HIT!!</span></p>";
      }
      else {
        document.getElementById('combat').innerHTML = document.getElementById('combat').innerHTML + "</p>";
      }
      useEnergyAmmo();
    }
    // ========NO AMMO================================================
    //=========================GUN======================================
    if (pWeapon.Type == "Gun" && items[3].inv == 0) {
      pCritical = (Math.random()) + pCrit;
      console.log("Rolled " + pCritical + " for a crit.");
      if (pCritical >= 1) {
        pCritHit = true;
      }
      else {
        pCritHit = false;
      }
      if (pCritHit == true) {
        pDamDone = ((pStr)*2);
        eHitPoints -= pDamDone;
      }
      else {
        pDamDone = (pStr);
        eHitPoints -= pDamDone;
      }
      document.getElementById('combat').innerHTML = "<p>You <span class='stat'>don't have any ammo</span>, so you bash the " + enemy.Name + " with your gun for <span class='damage'>" + pDamDone + "</span> damage!";
      if (pCritHit == true) {
        document.getElementById('combat').innerHTML = document.getElementById('combat').innerHTML + "<span class='damage'>CRITICAL HIT!!</span></p>";
      }
      else {
        document.getElementById('combat').innerHTML = document.getElementById('combat').innerHTML + "</p>";
      }
    }
    //===========================ENERGY===================================
    else if (pWeapon.Type == "Energy" && items[4].inv == 0) {
      pCritical = (Math.random()) + pCrit;
      console.log("Rolled " + pCritical + " for a crit.");
      if (pCritical >= 1) {
        pCritHit = true;
      }
      else {
        pCritHit = false;
      }
      if (pCritHit == true) {
        pDamDone = ((pStr)*2);
        eHitPoints -= pDamDone;
      }
      else {
        pDamDone = (pStr);
        eHitPoints -= pDamDone;
      }
      document.getElementById('combat').innerHTML = "<p>You <span class='stat'>don't have any energy ammo</span>, so you bash the " + enemy.Name + " with your gun for <span class='damage'>" + pDamDone + "</span> damage!";
      if (pCritHit == true) {
        document.getElementById('combat').innerHTML = document.getElementById('combat').innerHTML + "<span class='damage'>CRITICAL HIT!!</span></p>";
      }
      else {
        document.getElementById('combat').innerHTML = document.getElementById('combat').innerHTML + "</p>";
      }
    }
    // === STANDARD MELEE ===
    else if (pWeapon.Type == "Melee"){
      pCritical = (Math.random()) + pCrit;
      console.log("Rolled " + pCritical + " for a crit.");
      if (pCritical >= 1) {
        pCritHit = true;
      }
      else {
        pCritHit = false;
      }
      if (pCritHit == true) {
        pDamDone = ((pDam)*2);
        eHitPoints -= pDamDone;
      }
      else {
        pDamDone = (pDam);
        eHitPoints -= pDamDone;
      }
      document.getElementById('combat').innerHTML = "<p>You hit the " + enemy.Name + " for <span class='damage'>" + pDamDone + "</span> damage!";
      if (pCritHit == true) {
        document.getElementById('combat').innerHTML = document.getElementById('combat').innerHTML + "<span class='damage'>CRITICAL HIT!!</span></p>";
      }
      else {
        document.getElementById('combat').innerHTML = document.getElementById('combat').innerHTML + "</p>";
      }
    }
  }
  else {
    document.getElementById('combat').innerHTML = "<p>You try to attack the " + enemy.Name + ", but you miss!";
  }
  if (eHitPoints <= 0) {
    document.getElementById('combat').innerHTML = document.getElementById('combat').innerHTML + "<p>You win the fight!</p>";
    doResults();
  }
  else {
    enemyAttack();
  }
}

function runAction() {
  run = Math.random();
  if (run >= 0.5) {
    goGate();
    showAlert();
    document.getElementById('combat').innerHTML = '';
    document.getElementById('alert').innerHTML = '<p>You managed to run away from the fight.</p>';
  }
  else {
    showAlert();
    document.getElementById('alert').innerHTML = '<p>You were unable to escape!</p>';
    enemyAttack();
  }
}

function enemyAttack() {
  eHit = Math.random();
  console.log("Enemy rolled " + eHit + " to hit.");
  if (eHit <= 0.6) {
    eDam = enemy.Damage - pRed;
    if (eDam < 0) {
      eDam = 0;
    }
    else {

    }
    pCurHP -= eDam;
    document.getElementById('combat').innerHTML = document.getElementById('combat').innerHTML + enemy.textAttack //+ " You suffer <span class='damage'>" + eDam + "</span> damage!";
    document.getElementById('enemyDamage').innerHTML = eDam;
    if (pCurHP <= 0) {
      pCurHP = 0;
      youLose();
    }
    else {

    }
  }
  else {
    document.getElementById('combat').innerHTML = document.getElementById('combat').innerHTML + enemy.textMiss;
  }
}

function youLose() {
  pCapsLost = Math.floor(pCaps/2);
  pCaps = pCaps - pCapsLost;
  document.getElementById('results').innerHTML = '<p>You lose. You slink away, dejected and defeated.</p><p class="damage">You lost ' + pCapsLost + ' caps... </p>'
  document.getElementById('choice').innerHTML = '<button onclick="goGate();">Head back to the Gate</button>';
}

function doResults() {
  document.getElementById('choice').innerHTML = '<button onclick="goGate();">Head back to the Gate</button>';
  pExp += enemy.Exp;
  document.getElementById('results').innerHTML = "<p>You gained <span class='stat'>" + enemy.Exp + "</span> experience points!</p>";
  if (pExp >= toL2 && pLevel !== 2 && pLevel !== 3) {
    pLevel = 2;
    document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<p>You are now Level 2! Pick a perk!</p>';
    document.getElementById('choice').innerHTML = '';
    // ===============
    // Perk Addition 1
    // ===============
    document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<div id="perkChoice"><p><span class="clickable" onclick="window.alert(perks[0].Text);">Big Leagues</span> <button onClick="addPerk1(perks[0]);">Pick this Perk</button></p><p id="perkChoice"><span class="clickable" onclick="window.alert(perks[1].Text);">Awareness</span> <button onClick="addPerk1(perks[1]);">Pick this Perk</button></p><p><span class="clickable" onclick="window.alert(perks[2].Text);">Toughness</span> <button onClick="addPerk1(perks[2]);">Pick this Perk</button></p><p><span class="clickable" onclick="window.alert(perks[3].Text);">Silver Tongue</span> <button onClick="addPerk1(perks[3]);">Pick this Perk</button></p><p><span class="clickable" onclick="window.alert(perks[4].Text);">Science!</span> <button onClick="addPerk1(perks[4]);">Pick this Perk</button></p><p><span class="clickable" onclick="window.alert(perks[5].Text);">Gunslinger</span> <button onClick="addPerk1(perks[5]);">Pick this Perk</button></p><p><span class="clickable" onclick="window.alert(perks[6].Text);">Finesse</span> <button onClick="addPerk1(perks[6]);">Pick this Perk</button></p></div>';
    // ===============
  }
  else if (pExp >= toL3 && pLevel !== 3 && pLevel !== 1) {
    pLevel = 3;
    document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<p>You are now Level 3! Pick a perk!</p>';
    document.getElementById('choice').innerHTML = '';
    // ===============
    // Perk Addition 2
    // ===============
    document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<div id="perkChoice"><p><span class="clickable" onclick="window.alert(perks[0].Text);">Big Leagues</span> <button onClick="addPerk2(perks[0]);">Pick this Perk</button></p><p id="perkChoice"><span class="clickable" onclick="window.alert(perks[1].Text);">Awareness</span> <button onClick="addPerk2(perks[1]);">Pick this Perk</button></p><p><span class="clickable" onclick="window.alert(perks[2].Text);">Toughness</span> <button onClick="addPerk2(perks[2]);">Pick this Perk</button></p><p><span class="clickable" onclick="window.alert(perks[3].Text);">Silver Tongue</span> <button onClick="addPerk2(perks[3]);">Pick this Perk</button></p><p><span class="clickable" onclick="window.alert(perks[4].Text);">Science!</span> <button onClick="addPerk2(perks[4]);">Pick this Perk</button></p><p><span class="clickable" onclick="window.alert(perks[5].Text);">Gunslinger</span> <button onClick="addPerk2(perks[5]);">Pick this Perk</button></p><p><span class="clickable" onclick="window.alert(perks[6].Text);">Finesse</span> <button onClick="addPerk2(perks[6]);">Pick this Perk</button></p></div>';
    // ===============
  }
  pCaps += enemy.Caps;
  document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<p>You managed to scrounge up <img class="itemImg" src="./images/cap.png" alt=""> <span class="stat">' + enemy.Caps + '</span> caps during this run!';
  eRate = Math.random();
  if (eRate >= 0.5) {
    document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<p>You acquire an item: <span class="stat">' + eItem.Name + '</span>' + eItem.path;
    giveItem(eItem);
  }
}

//===================

// ==Give Item==

function giveItem(item) {
  if (item == items[0]) {
    getStim();
  }
  else if (item == items[5]) {
    getBat();
  }
  else if (item == items[6]) {
    getHydrant();
  }
  else if (item == items[7]) {
    get10mm();
  }
  else if (item == items[8]) {
    getAssault();
  }
  else if (item == items[9]) {
    getLaserP();
  }
  else if (item == items[10]) {
    getLaserR();
  }
}

// ==Add Perk==

function addPerk1(perk) {
  document.getElementById('perkChoice').innerHTML = 'Perk added! Check it out in your stats.';
  pPerk1 = perk;
  console.log(pPerk1);
  document.getElementById('perkSlot1').innerHTML = pPerk1.Slot;
  document.getElementById('choice').innerHTML = '<button onclick="goGate();">Head back to the Gate</button>';
}

function addPerk2(perk) {
  if (perk !== pPerk1) {
    document.getElementById('perkChoice').innerHTML = 'Perk added! Check it out in your stats.';
    pPerk2 = perk;
    console.log(pPerk1);
    document.getElementById('perkSlot2').innerHTML = pPerk2.Slot;
    document.getElementById('choice').innerHTML = '<button onclick="goGate();">Head back to the Gate</button>';
  }
  else {
    showAlert();
    document.getElementById('alert').innerHTML = 'You already have that perk!';
  }
}

// ==Use Stimpak==

function useStim() {
  showAlert();
  if (noItemUse == false && items[0].inv !== 0 && pCurHP !== pHitPoints) {
    pCurHP += 5;
    items[0].inv -= 1;
    if (pCurHP >= pHitPoints) {
      pCurHP = pHitPoints;
      document.getElementById('alert').innerHTML = '<p>You inject the stimpak. You feel much better.</p><p>Your HP was maxed out!</p>'
    }
    else {
      document.getElementById('alert').innerHTML = '<p>You inject the stimpak. You feel much better.</p><p>You recovered 5 HP!</p>'
    }
    document.getElementById('stimCount').innerHTML = items[0].inv;
  }
  else if (items[0].inv == 0) {
    document.getElementById('alert').innerHTML = "<p>You have no stimpaks left.</p>"
  }
  else if (pCurHP == pHitPoints) {
    document.getElementById('alert').innerHTML = "<p>Your HP is already maxed out.</p>"
  }
  else {
    document.getElementById('alert').innerHTML = "<p>You can't use that right now.</p>"
  }
}

// ==Use Ammo==
function useAmmo() {
  items[3].inv -= 1;
  document.getElementById('ammoCount').innerHTML = items[3].inv;
}

// ==Use Energy Ammo==
function useEnergyAmmo() {
  items[4].inv -= 1;
  document.getElementById('enAmmoCount').innerHTML = items[4].inv;
}

// ==Equip Leather Armor==
function equipLeather() {
  if (noItemUse == true) {
    showAlert();
    document.getElementById('alert').innerHTML = '<p>You cannot equip that right now!</p>';
  }
  else {
    pArmor = items[1];
    document.getElementById('armor').innerHTML = pArmor.Name;
    showAlert();
    document.getElementById('alert').innerHTML = '<p>Item equipped: <img class="itemImg" src="./images/larmor.png" alt="">Leather Armor</p>';
  }
}

// ==EQUIP COMBAT ARMOR==
function equipCombat() {
  if (noItemUse == true) {
    showAlert();
    document.getElementById('alert').innerHTML = '<p>You cannot equip that right now!</p>';
  }
  else {
    pArmor = items[2];
    document.getElementById('armor').innerHTML = pArmor.Name;
    showAlert();
    document.getElementById('alert').innerHTML = '<p>Item equipped: <img class="itemImg" src="./images/carmor.png" alt="">Combat Armor</p>';
  }
}

// ==Equip Bat==
function equipBat() {
  if (noItemUse == true) {
    showAlert();
    document.getElementById('alert').innerHTML = '<p>You cannot equip that right now!</p>';
  }
  else {
    pWeapon = items[5];
    pWeapon.Type = items[5].Type;
    document.getElementById('weapon').innerHTML = pWeapon.Name;
    showAlert();
    document.getElementById('alert').innerHTML = '<p>Item equipped: <img class="itemImg" src="./images/bat.png" alt="">Baseball Bat</p>';
  }
}
// ==Equip Hydrant Bat==
function equipHydrant() {
  if (noItemUse == true) {
    showAlert();
    document.getElementById('alert').innerHTML = '<p>You cannot equip that right now!</p>';
  }
  else {
    pWeapon = items[6];
    pWeapon.Type = items[6].Type;
    document.getElementById('weapon').innerHTML = pWeapon.Name;
    showAlert();
    document.getElementById('alert').innerHTML = '<p>Item equipped: <img class="itemImg" src="./images/hydrant.png" alt="">Hydrant Bat</p>';
  }
}
// ==Equip 10mm==
function equip10mm() {
  if (noItemUse == true) {
    showAlert();
    document.getElementById('alert').innerHTML = '<p>You cannot equip that right now!</p>';
  }
  else {
    pWeapon = items[7];
    pWeapon.Type = items[7].Type;
    console.log(pWeapon);
    document.getElementById('weapon').innerHTML = pWeapon.Name;
    showAlert();
    document.getElementById('alert').innerHTML = '<p>Item equipped: <img class="itemImg" src="./images/10mm.png" alt="">10mm Pistol</p>';
  }
}

// ==Equip Assault Rifle==
function equipAssault() {
  if (noItemUse == true) {
    showAlert();
    document.getElementById('alert').innerHTML = '<p>You cannot equip that right now!</p>';
  }
  else {
    pWeapon = items[8];
    pWeapon.Type = items[8].Type;
    document.getElementById('weapon').innerHTML = pWeapon.Name;
    showAlert();
    document.getElementById('alert').innerHTML = '<p>Item equipped: <img class="itemImg" src="./images/ar.png" alt="">Assault Rifle</p>';
  }
}

// ==Equip Laser Pistol==
function equipLaserP() {
  if (noItemUse == true) {
    showAlert();
    document.getElementById('alert').innerHTML = '<p>You cannot equip that right now!</p>';
  }
  else {
    pWeapon = items[9];
    pWeapon.Type = items[9].Type;
    document.getElementById('weapon').innerHTML = pWeapon.Name;
    showAlert();
    document.getElementById('alert').innerHTML = '<p>Item equipped: <img class="itemImg" src="./images/laserp.png" alt="">Laser Pistol</p>';
  }
}

// ==Equip Laser Rifle==
function equipLaserR() {
  if (noItemUse == true) {
    showAlert();
    document.getElementById('alert').innerHTML = '<p>You cannot equip that right now!</p>';
  }
  else {
    pWeapon = items[10];
    pWeapon.Type = items[10].Type;
    document.getElementById('weapon').innerHTML = pWeapon.Name;
    showAlert();
    document.getElementById('alert').innerHTML = '<p>Item equipped: <img class="itemImg" src="./images/lrifle.png" alt="">Laser Rifle</p>';
  }
}

// ==Change Name==
function changeName(){
  pName = document.getElementById('nameBox').value;
  document.getElementById('playerName').innerHTML = pName;
  console.log(pName);
  setTimeout(goAllocation(), 1000);
  setInterval(statRefresh, 500);
  clearAlert();
}

// ==Advance Intro==

function advanceIntro() {
  clearAlert();
  document.getElementById('story').innerHTML = '<p>Thank you for your entry. Vault-Tec is committed to the protection of user data. Please be aware that user data will only be shared with sponsoring third parties.</p><p>A few things to note before you begin; one you start you cannot change your stats or name. If you want to change these things, you will need to start a new game by reloading. You can use items in your inventory on the stat bar on the right by clicking on the "use" or otherwise labeled text. Choosing "heal" next to your name will automatically use a stimpak, should you be able to.</p><p>If you would like to re-submit your data, choose to go back. Otherwise, select continue to begin the simulation.</p><p><button id="respec" onclick="resetIntro();">Back</button><button id="specDone();" onclick="intro2();">Continue</button></p>';
}

// ==Intro Reset==

function resetIntro() {
  clearAlert();
  sPoints = 5;
  pStr = 1;
  document.getElementById('strength').innerHTML = pStr;
  pPer = 1;
  document.getElementById('perception').innerHTML = pPer;
  pEnd = 1;
  document.getElementById('endurance').innerHTML = pEnd;
  pCha = 1;
  document.getElementById('charisma').innerHTML = pCha;
  pInt = 1;
  document.getElementById('intelligence').innerHTML = pInt;
  pAgi = 1;
  document.getElementById('agility').innerHTML = pAgi;
  pLck = 1;
  document.getElementById('luck').innerHTML = pLck;
  document.getElementById('story').innerHTML = '<p>Hello, and thank you for choosing this Vault-Tec sanctioned simulation software! This small text-based assessment will show you how likely you are to survive in a post-apocalyptic wasteland. We have got a few things we need to get straight before we get started.</p><p id="nameInput">Potential wasteland survivor, please input your name. <input type="text" id="nameBox"></input><button id="nameSub" onclick="changeName();">Submit</button></p>'
}

// ==Final Intro==

function intro2() {
  clearAlert();
  pCurHP = pHitPoints;
  document.getElementById('story').innerHTML = "<p>You jolt awake. You're laying on a small, dirty mattress on a highway overpass. You grunt a bit as you rise from the mattress and get to your feet. You're lucky you found this old, unused campsite. Some poor fellow must have left to scavenge and never come back. The tarp on a divider, draped over a dirty mattress... It wasn't the most comfortable night.</p><p>None of this matters, though, you gather all of your things; a small backpack filled with just the essentials for not starving (you were lucky enough to find some pre-war food). You give a solemn salute to the campsite and move onward. You've just got about half a day's walk to the outskirts of Scrap City, one of the last big settlements in this region.</p><p>It's a long, hard road, but you manage to make it to the outskirts. Ahead of you lies a gigantic gate with a small metal shack, labeled 'Supplies and Entry'. You wearily make your way over to the counter. 'Hey, is this where I get in?' You ask the attendant, who looks quite tough. 'Nah.' He says back. 'You want in? You need to buy a passport.' He points to a sign; 200 caps for a passport. 'City needs to keep out the riff-raff.'</p><p>You sigh. This isn't perfect, but you can certainly work with this. You don't have any money left, but there are a lot of areas around here to explore. There has to be some good scavving to be done. You don't have a weapon or armor though, so it might be a bit dangerous. You'll have to find some while you're out.</p><button onclick='goGate();'>Well, here goes nothing.</button>";
  document.getElementById('image').innerHTML = '<img src="" alt="-On the road to Scrap City...-">';
}

// ==Gate==

function goGate() {
  clearAlert();
  if (pCurHP == 0) {
    pCurHP = 1;
  }
  noItemUse = false;
  document.getElementById('combat').innerHTML = '';
  document.getElementById('results').innerHTML = '';
  document.getElementById('image').innerHTML = '<img src="" alt="-The Gate-">';
  document.getElementById('story').innerHTML = "<p>You are at the gate to Scrap City. Seems like you could rest here for a bit, but there's also the store. When you feel ready to take on the wasteland, you can head out exploring.</p>";
  document.getElementById('choice').innerHTML = "<p><button onclick='goStore();'>Visit the Store</button></p><p><button onclick='goRest();'>Rest (Recover some HP)</button></p><p><button onclick='goCombat();'>Explore</button></p>";
}

// ==Rest==

function goRest() {
  showAlert();
  document.getElementById('image').innerHTML = '<img src="" alt="-A Moment of Rest-">';
    if (pCurHP == pHitPoints) {
      document.getElementById('alert').innerHTML = "There's no point in resting now. You're full of energy.";
    }
    else if (hasRested == true) {
      document.getElementById('alert').innerHTML = "You won't benefit from another rest until you've gone out exploring.";
    }
    else {
      pCurHP += 3;
      hasRested = true;
      if (pCurHP > pHitPoints) {
        pCurHP = pHitPoints;
        document.getElementById('alert').innerHTML = "You sit down and take a short rest. Your HP was maxed out!";
      }
      else {
        document.getElementById('alert').innerHTML = "You sit down and take a short rest. You recovered 3 HP.";
      }
    }
}

// ==Shop==

function goStore() {
  clearAlert();
  document.getElementById('choice').innerHTML = '<br><p><button onclick="goGate();">Enough shopping. Head back to the gate.</button></p>';
  document.getElementById('image').innerHTML = '<img src="" alt="-The Gate Store-">';
  document.getElementById('story').innerHTML = "<p>You approach the shack by the gate and peer at the shelves of items.</p>";
  document.getElementById('story').innerHTML = document.getElementById('story').innerHTML + "You will get a <span class='stat'>" + pDiscount + "% discount</span> thanks to your Charisma.";
  document.getElementById('story').innerHTML = document.getElementById('story').innerHTML + '<br><br><p><b>Passport</b> - Allows entry to Scrap City. <button onclick="buyPass();">Buy & finish game (' + (200*(1 - (pDiscount/100))) + ' caps)</button></p><br>';
  document.getElementById('story').innerHTML = document.getElementById('story').innerHTML + '<p><b>Ammo</b> - Ammunition for guns (pack of 5). <button onclick="buyAmmo();">Buy (' + (items[3].cost*(1 - (pDiscount/100))) + ' caps)</button></p>';
  document.getElementById('story').innerHTML = document.getElementById('story').innerHTML + '<p><b>Energy Ammo</b> - Ammunition for energy weapons (pack of 5). <button onclick="buyEnergyAmmo();">Buy (' + (items[4].cost*(1 - (pDiscount/100))) + ' caps)</button></p>';
  document.getElementById('story').innerHTML = document.getElementById('story').innerHTML + '<p><img class="itemImg" src="./images/stimpak.png" alt=""> Stimpak - Recover 5 HP. <button onclick="buyStim();">Buy (' + (items[0].cost*(1 - (pDiscount/100))) + ' caps)</button></p>';
  // Leather Armor
  if (items[1].inv == 0) {
    document.getElementById('story').innerHTML = document.getElementById('story').innerHTML + '<p><img class="itemImg" src="./images/larmor.png" alt=""> Leather Armor - Blocks 1 incoming damage point. <button onclick="buyLeather();">Buy (' + (items[1].cost*(1 - (pDiscount/100))) + ' caps)</button></p>';
  }
  else {

  }
  // Combat Armor
  if (items[2].inv == 0) {
    document.getElementById('story').innerHTML = document.getElementById('story').innerHTML + '<p><img class="itemImg" src="./images/carmor.png" alt=""> Combat Armor - Blocks 3 incoming damage points. <button onclick="buyCombat();">Buy (' + (items[2].cost*(1 - (pDiscount/100))) + ' caps)</button></p>';
  }
  else {

  }
}

// == Final Scene ==

function goFinal() {
  clearAlert();
  document.getElementById('image').innerHTML = '<img src="" alt="-Inside Scrap City-">';
  document.getElementById('story').innerHTML = "<p>With the pass in hand, you make your way over to the gate, and the man behind the counter uses a key in some kind of mechanism to open the door. The rusty metal pulls itself upwards and the street heading towards the center of this oasis in the wasteland is finally open to you. You step inside, and as the gate shuts behind you a sense of safety and relief you haven't felt in years washes over you. There are settlers wandering the streets, talking, trading, living... Maybe finally you can have a normal life. Maybe it's time for a good meal, or a stiff drink. But one thing is for sure...</p><p><h1>You made it into Scrap City!</h1></p>";
  document.getElementById('choice').innerHTML = "<button onclick='thankYou();'>Your journey is finally over.</button>";
}

function thankYou() {
  clearAlert();
  document.getElementById('image').innerHTML = '<img src="" alt="-Thank You-">';
  document.getElementById('story').innerHTML = "<p>Thank you so much for taking the time to play my text game. It was a stressful development, but I hope you found it fun enough to be worthy of your play time, or possible more in the future.</p><p>I know a lot of content you'd probably like is missing, but deadlines suck. Maybe I'll continue to work on this for the future. But either way, I couldn't be happier with what I've got here.</p><p>If you want to play again, simply hit the button below labeled 'I'd like to go again'.</p>";
  document.getElementById('choice').innerHTML = "<button onclick='location.reload();'>I'd like to go again.</button>";
}

// ==Buy Functions==

// Stimpak
function buyStim() {
  // Success
  if (pCaps >= (items[0].cost*(1 - (pDiscount/100)))) {
    pCaps -= (items[0].cost*(1 - (pDiscount/100)));
    getStim();
    goStore();
    showAlert();
    document.getElementById('alert').innerHTML = '<p>You bought 1 <img class="itemImg" src="./images/stimpak.png" alt=""> Stimpak.</p>';
  }
  // Failure
  else {
    showAlert();
    document.getElementById('alert').innerHTML = "<p>You don't have enough caps for that.</p>";
  }
}

// Ammo
function buyAmmo() {
  // Success
  if (pCaps >= (items[3].cost*(1 - (pDiscount/100)))) {
    pCaps -= (items[3].cost*(1 - (pDiscount/100)));
    getAmmo();
    goStore();
    showAlert();
    document.getElementById('alert').innerHTML = '<p>You bought a box of ammo.</p>';
  }
  // Failure
  else {
    showAlert();
    document.getElementById('alert').innerHTML = "<p>You don't have enough caps for that.</p>";
  }
}

// Energy Ammo
function buyEnergyAmmo() {
  // Success
  if (pCaps >= (items[4].cost*(1 - (pDiscount/100)))) {
    pCaps -= (items[4].cost*(1 - (pDiscount/100)));
    getEnergyAmmo();
    goStore();
    showAlert();
    document.getElementById('alert').innerHTML = '<p>You bought a box of energy ammo.</p>';
  }
  // Failure
  else {
    showAlert();
    document.getElementById('alert').innerHTML = "<p>You don't have enough caps for that.</p>";
  }
}

// Leather Armor
function buyLeather() {
  // Success
  if (pCaps >= (items[1].cost*(1 - (pDiscount/100)))) {
    pCaps -= (items[1].cost*(1 - (pDiscount/100)));
    getLeather();
    goStore();
    showAlert();
    document.getElementById('alert').innerHTML = '<p>You bought some <img class="itemImg" src="./images/larmor.png" alt=""> Leather Armor.</p>';
  }
  // Failure
  else {
    showAlert();
    document.getElementById('alert').innerHTML = "<p>You don't have enough caps for that.</p>";
  }
}

// Combat Armor
function buyCombat() {
  // Success
  if (pCaps >= (items[2].cost*(1 - (pDiscount/100)))) {
    pCaps -= (items[2].cost*(1 - (pDiscount/100)));
    getCombat();
    goStore();
    showAlert();
    document.getElementById('alert').innerHTML = '<p>You bought some <img class="itemImg" src="./images/carmor.png" alt=""> Combat Armor.</p>';
  }
  // Failure
  else {
    showAlert();
    document.getElementById('alert').innerHTML = "<p>You don't have enough caps for that.</p>";
  }
}

// Passport
function buyPass() {
  clearAlert();
  goFinal();
}

// ==Get Functions==

// Get Stimpak
function getStim() {
  if (items[0].inv == 0) {
    items[0].inv += 1;
    document.getElementById('inv1').innerHTML = document.getElementById('inv1').innerHTML + '<p id="stimSlot">Stimpak (<span id="stimCount">' + items[0].inv + '</span>) <span class="clickable" onclick="useStim();">[use]</span></p>';
  }
  else {
    items[0].inv += 1;
    document.getElementById('stimCount').innerHTML = items[0].inv;
  }
}

// Get Ammo
function getAmmo() {
  if (items[3].inv == 0) {
    items[3].inv += 5;
    document.getElementById('inv1').innerHTML = document.getElementById('inv1').innerHTML + '<p id="ammoSlot">Ammo (<span id="ammoCount">' + items[3].inv + '</span>)</p>';
  }
  else {
    items[3].inv += 5;
    document.getElementById('ammoCount').innerHTML = items[3].inv;
  }
}

// Get Energy Ammo
function getEnergyAmmo() {
  if (items[4].inv == 0) {
    items[4].inv += 5;
    document.getElementById('inv1').innerHTML = document.getElementById('inv1').innerHTML + '<p id="stimSlot">Energy Ammo (<span id="enAmmoCount">' + items[4].inv + '</span>)</p>';
  }
  else {
    items[4].inv += 5;
    document.getElementById('enAmmoCount').innerHTML = items[4].inv;
  }
}

// Get Leather Armor
function getLeather() {
  if (items[1].inv == 0) {
    items[1].inv += 1;
    document.getElementById('inv2').innerHTML = document.getElementById('inv2').innerHTML + '<p id="leatherSlot">Leather Armor (<span id="leathCount">' + items[1].inv + '</span>) <span class="clickable" onclick="equipLeather();">[equip]</span></p>';
  }
  else {
    items[1].inv += 1;
    document.getElementById('leathCount').innerHTML = items[1].inv;
  }
}

// Get Combat Armor
function getCombat() {
  if (items[2].inv == 0) {
    items[2].inv += 1;
    document.getElementById('inv2').innerHTML = document.getElementById('inv2').innerHTML + '<p id="combatSlot">Combat Armor (<span id="comCount">' + items[2].inv + '</span>) <span class="clickable" onclick="equipCombat();">[equip]</span></p>';
  }
  else {
    items[2].inv += 1;
    document.getElementById('comCount').innerHTML = items[2].inv;
  }
}

// Get Baseball Bat
function getBat() {
  if (items[5].inv == 0) {
    items[5].inv += 1;
    document.getElementById('inv2').innerHTML = document.getElementById('inv2').innerHTML + '<p id="batSlot">Baseball Bat (<span id="batCount">' + items[5].inv + '</span>) <span class="clickable" onclick="equipBat();">[equip]</span></p>';
  }
  else {
    items[5].inv += 1;
    document.getElementById('batCount').innerHTML = items[5].inv;
  }
}

// Get Hydrant Bat
function getHydrant() {
  if (items[6].inv == 0) {
    items[6].inv += 1;
    document.getElementById('inv2').innerHTML = document.getElementById('inv2').innerHTML + '<p id="hydrantSlot">Hydrant Bat (<span id="hydrantCount">' + items[6].inv + '</span>) <span class="clickable" onclick="equipHydrant();">[equip]</span></p>';
  }
  else {
    items[6].inv += 1;
    document.getElementById('hydrantCount').innerHTML = items[6].inv;
  }
}

// Get 10mm
function get10mm() {
  if (items[7].inv == 0) {
    items[7].inv += 1;
    document.getElementById('inv2').innerHTML = document.getElementById('inv2').innerHTML + '<p id="10mmSlot">10mm Pistol (<span id="10mmCount">' + items[7].inv + '</span>) <span class="clickable" onclick="equip10mm();">[equip]</span></p>';
  }
  else {
    items[7].inv += 1;
    document.getElementById('10mmCount').innerHTML = items[7].inv;
  }
}

// Get Assault Rifle
function getAssault() {
  if (items[8].inv == 0) {
    items[8].inv += 1;
    document.getElementById('inv2').innerHTML = document.getElementById('inv2').innerHTML + '<p id="assSlot">Assault Rifle (<span id="assCount">' + items[8].inv + '</span>) <span class="clickable" onclick="equipAssault();">[equip]</span></p>';
  }
  else {
    items[8].inv += 1;
    document.getElementById('assCount').innerHTML = items[8].inv;
  }
}

// Get Laser Pistol
function getLaserP() {
  if (items[9].inv == 0) {
    items[9].inv += 1;
    document.getElementById('inv2').innerHTML = document.getElementById('inv2').innerHTML + '<p id="lpSlot">Laser Pistol (<span id="lpCount">' + items[9].inv + '</span>) <span class="clickable" onclick="equipLaserP();">[equip]</span></p>';
  }
  else {
    items[9].inv += 1;
    document.getElementById('lpCount').innerHTML = items[9].inv;
  }
}

// Get Laser Rifle
function getLaserR() {
  if (items[10].inv == 0) {
    items[10].inv += 1;
    document.getElementById('inv2').innerHTML = document.getElementById('inv2').innerHTML + '<p id="lrSlot">Laser Rifle (<span id="lrCount">' + items[10].inv + '</span>) <span class="clickable" onclick="equipLaserR();">[equip]</span></p>';
  }
  else {
    items[10].inv += 1;
    document.getElementById('comCount').innerHTML = items[10].inv;
  }
}

// ==Special Allocation==

// Go to allocation

function goAllocation() {
  clearAlert();
  document.getElementById('story').innerHTML = '<p>Now, we need to decide what makes you S.P.E.C.I.A.L. Below, please allocate up to 5 points into your S.P.E.C.I.A.L score, which will determine what you’re good at. Each stat can be 3 at maximum.</p><p>Remaining Points: <span id="specPoints" class="stat">5</span></p><p>Strength: <span id="strChoice" class="stat">1</span> <button id="addStr" onclick="addStr();">+1</button><button style="visibility:hidden" id="subStr" onclick="subStr();">-1</button><br> Strength is a measure of your physical ability, and affects melee damage.</p><p>Perception: <span id="perChoice" class="stat">1</span> <button id="addPer" onclick="addPer();">+1</button><button style="visibility:hidden" id="subPer" onclick="subPer();">-1</button><br> Perception is a measure of your wariness and "sixth sense", it affects your accuracy with all weapons.</p><p>Endurance: <span id="endChoice" class="stat">1</span> <button id="addEnd" onclick="addEnd();">+1</button><button style="visibility:hidden" id="subEnd" onclick="subEnd();">-1</button><br> Endurance is a measure of your health and resistance, and affects maximum HP.</p><p>Charisma: <span id="chaChoice" class="stat">1</span> <button id="addCha" onclick="addCha();">+1</button><button style="visibility:hidden" id="subCha" onclick="subCha();">-1</button><br> Charisma is a measure of your silver tongue, and affects shop prices.</p><p>Intelligence: <span id="intChoice" class="stat">1</span> <button id="addInt" onclick="addInt();">+1</button><button style="visibility:hidden" id="subInt" onclick="subInt();">-1</button><br> Intelligence is a measure of your mental acuity. It affects your damage with Energy Weapons.</p><p>Agility: <span id="agiChoice" class="stat">1</span> <button id="addAgi" onclick="addAgi();">+1</button><button style="visibility:hidden" id="subAgi" onclick="subAgi();">-1</button><br> Agility is a measure of your finesse and dexterity, and affects your damage with traditional guns.</p><p>Luck: <span id="lckChoice" class="stat">1</span> <button id="addLck" onclick="addLck();">+1</button><button style="visibility:hidden" id="subLck" onclick="subLck();">-1</button><br> Luck is a measure of your good fortune, and affects your critical and item drop chances.</p><p>When you are all finished, click the button here: <button id="specDone" onclick="advanceIntro();">I am done!</button></p>';
}

// Strength
function addStr(){
  pStr += 1;
  sPoints -= 1;
  console.log(pStr);
  document.getElementById('strChoice').innerHTML = pStr;
  document.getElementById('strength').innerHTML = pStr;
  document.getElementById('specPoints').innerHTML = sPoints;
  if (pStr == 3) {
    document.getElementById("addStr").style.visibility = "hidden";
    document.getElementById("subStr").style.visibility = "visible";
  }
  else if (pStr == 2) {
    document.getElementById("subStr").style.visibility = "visible";
    document.getElementById("addStr").style.visibility = "visible";
  }
  else {
    document.getElementById("addStr").style.visibility = "visible";
    document.getElementById("subStr").style.visibility = "hidden";
  }
  checkPoints();
}
function subStr(){
  pStr -= 1;
  sPoints += 1;
  console.log(pStr);
  document.getElementById('strChoice').innerHTML = pStr;
  document.getElementById('strength').innerHTML = pStr;
  document.getElementById('specPoints').innerHTML = sPoints;
  if (pStr == 3) {
    document.getElementById("addStr").style.visibility = "hidden";
    document.getElementById("subStr").style.visibility = "visible";
  }
  else if (pStr == 2) {
    document.getElementById("subStr").style.visibility = "visible";
    document.getElementById("addStr").style.visibility = "visible";
  }
  else {
    document.getElementById("addStr").style.visibility = "visible";
    document.getElementById("subStr").style.visibility = "hidden";
  }
}

// Perception
function addPer(){
  pPer += 1;
  sPoints -= 1;
  console.log(pPer);
  document.getElementById('perChoice').innerHTML = pPer;
  document.getElementById('perception').innerHTML = pPer;
  document.getElementById('specPoints').innerHTML = sPoints;
  if (pPer == 3) {
    document.getElementById("addPer").style.visibility = "hidden";
    document.getElementById("subPer").style.visibility = "visible";
  }
  else if (pPer == 2) {
    document.getElementById("subPer").style.visibility = "visible";
    document.getElementById("addPer").style.visibility = "visible";
  }
  else {
    document.getElementById("addPer").style.visibility = "visible";
    document.getElementById("subPer").style.visibility = "hidden";
  }
  checkPoints();
}
function subPer(){
  pPer -= 1;
  sPoints += 1;
  console.log(pPer);
  document.getElementById('perChoice').innerHTML = pPer;
  document.getElementById('perception').innerHTML = pPer;
  document.getElementById('specPoints').innerHTML = sPoints;
  if (pPer == 3) {
    document.getElementById("addPer").style.visibility = "hidden";
    document.getElementById("subPer").style.visibility = "visible";
  }
  else if (pPer == 2) {
    document.getElementById("subPer").style.visibility = "visible";
    document.getElementById("addPer").style.visibility = "visible";
  }
  else {
    document.getElementById("addPer").style.visibility = "visible";
    document.getElementById("subPer").style.visibility = "hidden";
  }
  checkPoints();
}

// Endurance
function addEnd(){
  pEnd += 1;
  sPoints -= 1;
  console.log(pEnd);
  document.getElementById('endChoice').innerHTML = pEnd;
  document.getElementById('endurance').innerHTML = pEnd;
  document.getElementById('specPoints').innerHTML = sPoints;
  if (pEnd == 3) {
    document.getElementById("addEnd").style.visibility = "hidden";
    document.getElementById("subEnd").style.visibility = "visible";
  }
  else if (pEnd == 2) {
    document.getElementById("subEnd").style.visibility = "visible";
    document.getElementById("addEnd").style.visibility = "visible";
  }
  else {
    document.getElementById("addEnd").style.visibility = "visible";
    document.getElementById("subEnd").style.visibility = "hidden";
  }
  checkPoints();
}
function subEnd(){
  pEnd -= 1;
  sPoints += 1;
  console.log(pEnd);
  document.getElementById('endChoice').innerHTML = pEnd;
  document.getElementById('endurance').innerHTML = pEnd;
  document.getElementById('specPoints').innerHTML = sPoints;
  if (pEnd == 3) {
    document.getElementById("addEnd").style.visibility = "hidden";
    document.getElementById("subEnd").style.visibility = "visible";
  }
  else if (pEnd == 2) {
    document.getElementById("subEnd").style.visibility = "visible";
    document.getElementById("addEnd").style.visibility = "visible";
  }
  else {
    document.getElementById("addEnd").style.visibility = "visible";
    document.getElementById("subEnd").style.visibility = "hidden";
  }
  checkPoints();
}

// Charisma
function addCha(){
  pCha += 1;
  sPoints -= 1;
  console.log(pCha);
  document.getElementById('chaChoice').innerHTML = pCha;
  document.getElementById('charisma').innerHTML = pCha;
  document.getElementById('specPoints').innerHTML = sPoints;
  if (pCha == 3) {
    document.getElementById("addCha").style.visibility = "hidden";
    document.getElementById("subCha").style.visibility = "visible";
  }
  else if (pCha == 2) {
    document.getElementById("subCha").style.visibility = "visible";
    document.getElementById("addCha").style.visibility = "visible";
  }
  else {
    document.getElementById("addCha").style.visibility = "visible";
    document.getElementById("subCha").style.visibility = "hidden";
  }
  checkPoints();
}
function subCha(){
  pCha -= 1;
  sPoints += 1;
  console.log(pCha);
  document.getElementById('chaChoice').innerHTML = pCha;
  document.getElementById('charisma').innerHTML = pCha;
  document.getElementById('specPoints').innerHTML = sPoints;
  if (pCha == 3) {
    document.getElementById("addCha").style.visibility = "hidden";
    document.getElementById("subCha").style.visibility = "visible";
  }
  else if (pCha == 2) {
    document.getElementById("subCha").style.visibility = "visible";
    document.getElementById("addCha").style.visibility = "visible";
  }
  else {
    document.getElementById("addCha").style.visibility = "visible";
    document.getElementById("subCha").style.visibility = "hidden";
  }
  checkPoints();
}

// Intelligence
function addInt(){
  pInt += 1;
  sPoints -= 1;
  console.log(pInt);
  document.getElementById('intChoice').innerHTML = pInt;
  document.getElementById('intelligence').innerHTML = pInt;
  document.getElementById('specPoints').innerHTML = sPoints;
  if (pInt == 3) {
    document.getElementById("addInt").style.visibility = "hidden";
    document.getElementById("subInt").style.visibility = "visible";
  }
  else if (pInt == 2) {
    document.getElementById("subInt").style.visibility = "visible";
    document.getElementById("addInt").style.visibility = "visible";
  }
  else {
    document.getElementById("addInt").style.visibility = "visible";
    document.getElementById("subInt").style.visibility = "hidden";
  }
  checkPoints();
}
function subInt(){
  pInt -= 1;
  sPoints += 1;
  console.log(pInt);
  document.getElementById('intChoice').innerHTML = pInt;
  document.getElementById('intelligence').innerHTML = pInt;
  document.getElementById('specPoints').innerHTML = sPoints;
  if (pInt == 3) {
    document.getElementById("addInt").style.visibility = "hidden";
    document.getElementById("subInt").style.visibility = "visible";
  }
  else if (pInt == 2) {
    document.getElementById("subInt").style.visibility = "visible";
    document.getElementById("addInt").style.visibility = "visible";
  }
  else {
    document.getElementById("addInt").style.visibility = "visible";
    document.getElementById("subInt").style.visibility = "hidden";
  }
  checkPoints();
}

// Agility
function addAgi(){
  pAgi += 1;
  sPoints -= 1;
  console.log(pAgi);
  document.getElementById('agiChoice').innerHTML = pAgi;
  document.getElementById('agility').innerHTML = pAgi;
  document.getElementById('specPoints').innerHTML = sPoints;
  if (pAgi == 3) {
    document.getElementById("addAgi").style.visibility = "hidden";
    document.getElementById("subAgi").style.visibility = "visible";
  }
  else if (pAgi == 2) {
    document.getElementById("subAgi").style.visibility = "visible";
    document.getElementById("addAgi").style.visibility = "visible";
  }
  else {
    document.getElementById("addAgi").style.visibility = "visible";
    document.getElementById("subAgi").style.visibility = "hidden";
  }
  checkPoints();
}
function subAgi(){
  pAgi -= 1;
  sPoints += 1;
  console.log(pAgi);
  document.getElementById('agiChoice').innerHTML = pAgi;
  document.getElementById('agility').innerHTML = pAgi;
  document.getElementById('specPoints').innerHTML = sPoints;
  if (pAgi == 3) {
    document.getElementById("addAgi").style.visibility = "hidden";
    document.getElementById("subAgi").style.visibility = "visible";
  }
  else if (pAgi == 2) {
    document.getElementById("subAgi").style.visibility = "visible";
    document.getElementById("addAgi").style.visibility = "visible";
  }
  else {
    document.getElementById("addAgi").style.visibility = "visible";
    document.getElementById("subAgi").style.visibility = "hidden";
  }
  checkPoints();
}

// Luck
function addLck(){
  pLck += 1;
  sPoints -= 1;
  console.log(pLck);
  document.getElementById('lckChoice').innerHTML = pLck;
  document.getElementById('luck').innerHTML = pLck;
  document.getElementById('specPoints').innerHTML = sPoints;
  if (pLck == 3) {
    document.getElementById("addLck").style.visibility = "hidden";
    document.getElementById("subLck").style.visibility = "visible";
  }
  else if (pLck == 2) {
    document.getElementById("subLck").style.visibility = "visible";
    document.getElementById("addLck").style.visibility = "visible";
  }
  else {
    document.getElementById("addLck").style.visibility = "visible";
    document.getElementById("subLck").style.visibility = "hidden";
  }
  checkPoints();
}
function subLck(){
  pLck -= 1;
  sPoints += 1;
  console.log(pLck);
  document.getElementById('lckChoice').innerHTML = pLck;
  document.getElementById('luck').innerHTML = pLck;
  document.getElementById('specPoints').innerHTML = sPoints;
  if (pLck == 3) {
    document.getElementById("addLck").style.visibility = "hidden";
    document.getElementById("subLck").style.visibility = "visible";
  }
  else if (pLck == 2) {
    document.getElementById("subLck").style.visibility = "visible";
    document.getElementById("addLck").style.visibility = "visible";
  }
  else {
    document.getElementById("addLck").style.visibility = "visible";
    document.getElementById("subLck").style.visibility = "hidden";
  }
  checkPoints();
}

// Check Points and Hide Stuff
function checkPoints(){
  console.log("Checking");
  if (sPoints == 0) {
    console.log("no points");
    if (pStr !== 3) {
      document.getElementById("addStr").style.visibility = "hidden";
    }
    else {

    }
    if (pPer !== 3) {
      document.getElementById("addPer").style.visibility = "hidden";
    }
    else {

    }
    if (pEnd !== 3) {
      document.getElementById("addEnd").style.visibility = "hidden";
    }
    else {

    }
    if (pCha !== 3) {
      document.getElementById("addCha").style.visibility = "hidden";
    }
    else {

    };
    if (pInt !== 3) {
      document.getElementById("addInt").style.visibility = "hidden";
    }
    else {

    };
    if (pAgi !== 3) {
      document.getElementById("addAgi").style.visibility = "hidden";
    }
    else {

    };
    if (pLck !== 3) {
      document.getElementById("addLck").style.visibility = "hidden";
    }
    else {

    }

  }
  if (sPoints !== 0) {
    console.log("have points");
    if (pStr == 3) {
      document.getElementById("addStr").style.visibility = "hidden";
    }
    else {
      document.getElementById("addStr").style.visibility = "visible";
    }
    if (pPer == 3) {
      document.getElementById("addPer").style.visibility = "hidden";
    }
    else {
      document.getElementById("addPer").style.visibility = "visible";
    }
    if (pEnd == 3) {
      document.getElementById("addEnd").style.visibility = "hidden";
    }
    else {
      document.getElementById("addEnd").style.visibility = "visible";
    }
    if (pCha == 3) {
      document.getElementById("addCha").style.visibility = "hidden";
    }
    else {
      document.getElementById("addCha").style.visibility = "visible";
    }
    if (pInt == 3) {
      document.getElementById("addInt").style.visibility = "hidden";
    }
    else {
      document.getElementById("addInt").style.visibility = "visible";
    }
    if (pAgi == 3) {
      document.getElementById("addAgi").style.visibility = "hidden";
    }
    else {
      document.getElementById("addAgi").style.visibility = "visible";
    }
    if (pLck == 3) {
      document.getElementById("addLck").style.visibility = "hidden";
    }
    else {
      document.getElementById("addLck").style.visibility = "visible";
    };
}
}
