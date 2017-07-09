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
  this.image = "<img src='./img/gryffindor.gif' width=300px height=250px>";
};
Hogwarts.Gryffindor.prototype = new Hogwarts.Student();


Hogwarts.Hufflepuff = function() {
  this.name = "Hufflepuff";
  this.healthBonus = this.healthBonus + 20;
  this.strengthBonus = this.strengthBonus + 10;
  this.image = "<img src='./img/hufflepuff.gif' width=300px height=250px>";
};
Hogwarts.Hufflepuff.prototype = new Hogwarts.Student();


Hogwarts.Ravenclaw = function() {
  this.name = "Ravenclaw";
  this.healthBonus = this.healthBonus + 35;
  this.strengthBonus = this.strengthBonus + 20;
  this.image = "<img src='./img/ravenclaw.gif' width=300px height=250px>";
};
Hogwarts.Ravenclaw.prototype = new Hogwarts.Student();


Hogwarts.Slytherin = function() {
  this.name = "Slytherin";
  this.healthBonus = this.healthBonus + 10;
  this.strengthBonus = this.strengthBonus + 40;
  this.image = "<img src='./img/slytherin.gif' width=300px height=250px>";
};
Hogwarts.Slytherin.prototype = new Hogwarts.Student();

module.exports = {
  Hogwarts: Hogwarts
};
