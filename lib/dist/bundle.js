(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
const player = require("./player");
const enemies = require("./enemies");
const spells = require("./spells");
const patronus = require("./patronus");
const creatures = require("./creatures");
// const config = require("./config");
const classes = require("./classes");
const battle = require("./battle");


$("#battleImage").hide();
  /*
    Show the initial view that accepts player name
//    */

$("#player-setup").show();
var student = new player.Combatants.Wizard();
var deathEater = new enemies.Voldemort();
console.log(deathEater);
deathEater.generateSpell();
deathEater.generateNames();
let test = new player.Combatants.Wizard();
console.log(test);
/*
  When any button with card__link class is clicked,
  move on to the next view.
 */
$(".card__link").click(function(e) {
  var nextCard = $(this).attr("next");
  var moveAlong = false;

  switch (nextCard) {
    case "card--class":
      moveAlong = ($("#player-name").val() !== "");
      var player = $("#player-name").val();
      console.log(student);
      student.playerName = player;
      break;
    case "card--weapon":
      moveAlong = (student.house !== null);
      if (student.house === null) {
        alert("Please select a house.");
        break;
      }
      break;
     case "card--battleground":
      moveAlong = (student.patronus !== null);
      if (student.patronus === null) {
        alert("Please select a patronus.");
        break;
      }
      break;
     default :
     console.log("everything is broken fml");
  }
  if (moveAlong) {
    $(".card").hide();
    $("." + nextCard).show();
  }
});

$("#userSortingHat").click(function(e){
    var test = $(e.target).is(".btn__text");
    if (test){
      let clicked = $(e.target).find(".btn__text").context.innerHTML;
      if (clicked === "Sorting Hat"){
        student.generateHouse();
      } else {
        student.house = new classes.Hogwarts[clicked]();
      }
    }
  e.preventDefault();
  });

$("#userPatronus").click(function(e){
  var test = $(e.target).is(".btn__text");
  if (test){
      let clicked = $(e.target).find(".btn__text").context.innerHTML;
      student.patronus = new patronus.Patroni[clicked]();
      console.log("patronus", student);
      e.preventDefault();
  }
});
$("#defeatEnemies").click(function(e){
    battle.Battle.startAttack(student, deathEater);
});
var newBattle = 0;
$("#AttackEnemy").click(function(e){
    battle.Battle.generateImage();
    newBattle++;
    let type = student.patronus;
    battle.Battle.runAttack(student, deathEater, type, newBattle);

});
$("#castSpell").click(function(e){
  battle.Battle.generateImage();
  newBattle++;
  student.generateSpell();
  let type = student.spell;
  battle.Battle.runAttack(student, deathEater, type, newBattle);

});
$("#getFriend").click(function(e){
  battle.Battle.generateImage();
  newBattle++;
  student.generateCreature();
  let type = student.creature;
  battle.Battle.runAttack(student, deathEater, type, newBattle);

});
/*
  When the back button clicked, move back a view
 */
$(".card__back").click(function(e) {
  var previousCard = $(this).attr("previous");
  $(".card").hide();
  $("." + previousCard).show();
});



},{"./battle":2,"./classes":3,"./creatures":4,"./enemies":5,"./patronus":6,"./player":7,"./spells":8}],2:[function(require,module,exports){
'use strict';
var Battle = {};
	
Battle.startAttack = function(studentObj, deathEaterObj){
	$("#studentStats").html("");
	$("#studentStats").append(`${studentObj.playerName}<br />${studentObj.house}<br />${studentObj.patronus} <br />${studentObj.health}<br />`);
	$("#deathEaterStats").html("");
	$("#deathEaterStats").append(`${deathEaterObj.playerName}<br />${deathEaterObj.house}<br />${deathEaterObj.spell} <br />${deathEaterObj.health}<br />`);
	$("#img_player").html(studentObj.house.image);
	$("#img_enemy").html(deathEaterObj.image);
};
Battle.generateImage = function(){
	var Gifs = [];
	Gifs[0]="../gif/gif1.gif";
	Gifs[1]="../gif/gif2.gif";
	Gifs[2]="../gif/gif3.gif";
	Gifs[3]="../gif/gif4.gif";
	Gifs[4]="../gif/gif5.gif";
	Gifs[5]="../gif/gif6.gif";
	Gifs[6]="../gif/gif7.gif";
	var random = Math.round(Math.random() * Gifs.length - 1);
	var printGif = Gifs[random];
	$("#battleImage").attr("src", printGif);
	$("#battleImage").css("display", "block");
	console.log($("#battleImage"));
	$('#battleImage').fadeIn('fast').delay(2000).fadeOut('fast');
};
Battle.runAttack = function(studentObj, deathEaterObj, studentType, battleObj){
    studentObj.health -= deathEaterObj.spell.damage;
	var studentHealthBar = $("#student_health");
	studentHealthBar.attr('value', studentObj.health);
	deathEaterObj.health -= studentType.damage;
	var deathEaterHealthBar = $("#deatheater_health");
    deathEaterHealthBar.attr('value', deathEaterObj.health);
    $("#battleStats").html("");		
	$("#battleStats").html(`<div> <h1>Battle ${battleObj}</h1> ${studentObj.playerName} has ${studentType}</div>`);
    $("#battleStats").append(`<div>${deathEaterObj.playerName} has ${deathEaterObj.spell}</div>`);
    if (studentObj.health <= 0) {
        $("#loseMessage").append(`You lost to your enemy with ${studentObj.health} points!`);
		$("#userLose").modal('show');
		$(".card__button").addClass("disabledbutton");
    } else if (deathEaterObj.health <= 0) {
        $("#winMessage").append(`You won with ${studentObj.health} points over your enemy!`);
		$("#userWin").modal('show');
		$(".card__button").addClass("disabledbutton");
    }
};
module.exports = {
  Battle: Battle
};
},{}],3:[function(require,module,exports){
'use strict';
/*
  TODO: Modularize this code with IIFE or Browserify
 */
var Hogwarts = {};

/*
  Base function for a player, or enemy, class (profession)
 */
Hogwarts.PlayerClass = function() {
  this.name = "Beggar";
  this.healthBonus = 0;
  this.strengthBonus = 0;
  this.intelligenceBonus = 0;
  // this.magical = false;

  this.toString = function() {
    return this.name;
  };
};

/*
    SORTING HAT CLASSES
      - Gryffindor
      - Hufflepuff
      - Ravenclaw
      - Slytherin
 */
Hogwarts.Student = function() {
  this.healthBonus = 20;
  this.strengthBonus = 10;
};
Hogwarts.Student.prototype = new Hogwarts.PlayerClass();


Hogwarts.Gryffindor = function() {
  this.name = "Gryffindor";
  this.healthBonus = this.healthBonus + 25;
  this.strengthBonus = this.strengthBonus + 30;
  this.image = "<img src='../img/wat.png' width=300px height=250px>";
};
Hogwarts.Gryffindor.prototype = new Hogwarts.Student();


Hogwarts.Hufflepuff = function() {
  this.name = "Hufflepuff";
  this.healthBonus = this.healthBonus + 20;
  this.strengthBonus = this.strengthBonus + 10;
  this.image = "<img src='../img/Conjunctivitis.jpg' width=300px height=250px>";
};
Hogwarts.Hufflepuff.prototype = new Hogwarts.Student();


Hogwarts.Ravenclaw = function() {
  this.name = "Ravenclaw";
  this.healthBonus = this.healthBonus + 35;
  this.strengthBonus = this.strengthBonus + 20;
  this.image = "<img src='../img/hagrid.png' width=300px height=250px>";
};
Hogwarts.Ravenclaw.prototype = new Hogwarts.Student();


Hogwarts.Slytherin = function() {
  this.name = "Slytherin";
  this.healthBonus = this.healthBonus + 10;
  this.strengthBonus = this.strengthBonus + 40;
  this.image = "<img src='../img/hogwartscastle.jpg' width=300px height=250px>";
};
Hogwarts.Slytherin.prototype = new Hogwarts.Student();

module.exports = {
  Hogwarts: Hogwarts
};

},{}],4:[function(require,module,exports){
'use strict';
var Creatures = {};

Creatures.Friend = function() {
  this.name = "";
  this.damage = 0;

  this.toString = function() {
    var friendOutput = [
    "been helped by ",
    this.name, 
    " a ", 
    this.species,
    " with a damage of ",
    this.damage].join("");
    // return this.name;
    return friendOutput;
  };
};

Creatures.Dobby = function() {
  this.name = "Dobby";
  this.species = "House Elf";
  this.damage = Math.floor(Math.random() * 10 + 10);
};
Creatures.Dobby.prototype = new Creatures.Friend();

Creatures.Buckbeak= function() {
  this.name = "Buckbeak";
  this.species = "Hippogriff";
  this.damage = Math.floor(Math.random() * 10 + 10);
};
Creatures.Buckbeak.prototype = new Creatures.Friend();

Creatures.Fawkes = function() {
  this.name = "Fawkes";
  this.species = "Phoenix";
  this.damage = Math.floor(Math.random() * 10 + 10);

};
Creatures.Fawkes.prototype = new Creatures.Friend();

module.exports = {
  Creatures: Creatures
};


},{}],5:[function(require,module,exports){
'use strict';
const player = require("./player");


var Voldemort = function() {
  this.health = this.health + 20;
  this.species = "Voldemort";
  this.allowedNames = ["Zoe Ames", "Nathan Gonzalez", "William Hickok"];
  this.allowedSpells = ["Imperio", "Crucio"];
  this.house = "Slytherin";
  this.image = "<img src='../img/voldemort.jpg' width=300px height=250px>";
  this.generateNames = function(){
    var random = Math.round(Math.random() * (this.allowedNames.length - 1));

      // Get the string at the index
      var randomClass = this.allowedNames[random];

      // Composes the corresponding player class into the player object
      this.playerName = randomClass;
      return this.playerName;
  };
};


Voldemort.prototype = new player.Combatants.DeathEater();

module.exports = {
  Voldemort: Voldemort
};

},{"./player":7}],6:[function(require,module,exports){
'use strict';
/*
  TODO: Modularize this code with IIFE or Browserify
 */
var Patroni = {};

/*
  Base function for a player, or enemy, class (profession)
 */
Patroni.Patronus = function() {
  this.name = "Patronus";
  this.animal = "";
  this.damage = 0;
  this.toString = function() {
    return "cast " + this.name + " of " + this.animal + " for " + this.damage + " damage";

  };
};



Patroni.Stag = function() {
  this.animal = "Stag";
  this.damage = Math.floor(Math.random() * 10 + 10);
};
Patroni.Stag.prototype = new Patroni.Patronus();


Patroni.Otter = function() {
  this.animal = "Otter";
  this.damage = Math.floor(Math.random() * 10 + 10);
};
Patroni.Otter.prototype = new Patroni.Patronus();


Patroni.Hedgehog = function() {
  this.animal = "Hedgehog";
  this.damage = Math.floor(Math.random() * 10 + 10);
};
Patroni.Hedgehog.prototype = new Patroni.Patronus();

Patroni.Dolphin = function() {
  this.animal = "Dolphin";
  this.damage = Math.floor(Math.random() * 10 + 10);
};
Patroni.Dolphin.prototype = new Patroni.Patronus();

module.exports = {
  Patroni: Patroni
};

},{}],7:[function(require,module,exports){
'use strict';
/*
  TODO: Modularize this code with IIFE or Browserify
 */
const spells = require("./spells");
const classes = require("./classes");
const creatures = require("./creatures");

var Combatants = {};
/*
  Define the base object for any player of Gauntlet,
  whether a human player or a monster.
 */
Combatants.Player = function(name = "unknown adventurer") {
  this.species = null;
  this.class = null;
  this.weapon = null;

  this.playerName = name;
  this.health = Math.floor(Math.random() * 40 + 50);
  this.limbs = ["head", "neck", "arm", "leg", "torso"];
  this.skinColor = "gray";
  this.skinColors = [this.skinColor];
  this.strength = 90;
  this.intelligence = 90;

};

// OldGauntlet.Combatants.Player.prototype.setWeapon = function(newWeapon) {
//   this.weapon = newWeapon;
// }

Combatants.Player.prototype.generateHouse = function() {
  // Get a random index from the allowed classes array
  var random = Math.round(Math.random() * (this.allowedHouses.length - 1));

  // Get the string at the index
  var randomClass = this.allowedHouses[random];

  // Composes the corresponding player class into the player object
  this.house = new classes.Hogwarts[randomClass]();
  return this.house;
};

Combatants.Player.prototype.generateSpell = function() {
  // Get a random index from the allowed classes array
  var random = Math.round(Math.random() * (this.allowedSpells.length - 1));

  // Get the string at the index

  var randomClass = this.allowedSpells[random];

  // Composes the corresponding player class into the player object
  this.spell = new spells.SpellBook[randomClass]();
  return this.spell;
};

Combatants.Player.prototype.generateCreature = function() {
  // Get a random index from the allowed classes array
  var random = Math.round(Math.random() * (this.allowedCreatures.length - 1));

  // Get the string at the index
  var randomClass = this.allowedCreatures[random];

  // Composes the corresponding player class into the player object
  this.creature = new creatures.Creatures[randomClass]();
  return this.creature;
};

/*
  Define the base properties for a human in a
  constructor function.
 */
Combatants.Wizard = function() {
  var randomSkin;

  this.species = "Human";
  this.intelligence = this.intelligence + 20;
  this.house = null;
  this.patronus = null;
  this.spell = null;
  this.creature = null;

  this.skinColors.push("brown", "red", "white", "disease");
  randomSkin = Math.round(Math.random() * (this.skinColors.length-1));
  this.skinColor = this.skinColors[randomSkin];

  this.allowedHouses = ["Ravenclaw", "Slytherin", "Gryffindor", "Hufflepuff"];
  this.allowedSpells = ["Expelliarmus", "Conjunctivitis", "Confringo"];
  this.allowedCreatures = ["Dobby", "Buckbeak", "Fawkes"];
  this.toString = function() {
    var output = [this.playerName,
      " is in ",
      this.house,
      " with a ",
      this.spell,
      ", and has health of ",
      this.health,
      "!"
    ].join("");
    return output;
  };
};
Combatants.Wizard.prototype = new Combatants.Player();


/*
  Define the base properties for a monster in a
  constructor function.
 */
Combatants.DeathEater = function() {
  this.health = this.health - 30;
  this.intelligence = this.intelligence -20;
  this.strength = this.strength + 30;
  this.toString = function() {
    var output = [this.playerName,
      "<br />",
      this.house,
      "<br />",
      this.spell,
      "<br />",
      this.health,
      " Health"
    ].join("");
    return output;
  };
};

Combatants.DeathEater.prototype = new Combatants.Player();

module.exports = {
  Combatants: Combatants
};

},{"./classes":3,"./creatures":4,"./spells":8}],8:[function(require,module,exports){
'use strict';
/*
  TODO: Modularize this code with IIFE or Browserify
 */

var SpellBook = {};


/*
  Base spell function that defines name, damage, damage type
 */
SpellBook.Spell = function() {
  this.name = "";
  this.damage = 0;
  this.toString = function() {
    return "cast " + this.name + " for " + this.damage + " damage";

  };
};

/*
  An elemental sphere that can be cast by a magical class
 */
SpellBook.Expelliarmus = function() {
  this.name = "Expelliarmus";
  this.damage = Math.floor(Math.random() * 10 + 10);
};
SpellBook.Expelliarmus.prototype = new SpellBook.Spell();

SpellBook.Confringo = function() {
  this.name = "Confringo";
  this.damage = Math.floor(Math.random() * 10 + 10);
};
SpellBook.Confringo.prototype = new SpellBook.Spell();

SpellBook.Conjunctivitis = function() {
  this.name = "Conjunctivitis";
  this.damage = Math.floor(Math.random() * 10 + 10);

};
SpellBook.Conjunctivitis.prototype = new SpellBook.Spell();

SpellBook.Imperio = function() {
  this.name = "Imperio";
  this.damage = Math.floor(Math.random() * 10 + 10);

};
SpellBook.Imperio.prototype = new SpellBook.Spell();

SpellBook.Crucio = function() {
  this.name = "Crucio";
  this.damage = Math.floor(Math.random() * 10 + 10);

};
SpellBook.Crucio.prototype = new SpellBook.Spell();

module.exports = {
  SpellBook: SpellBook
};

},{}]},{},[1]);
