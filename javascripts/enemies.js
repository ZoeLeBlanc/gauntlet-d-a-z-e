'use strict';
const player = require("./player");


var Voldemort = function() {
  this.health = this.health + 20;
  this.species = "Voldemort";
  this.allowedNames = ["Voldemort", "Bellatrix Lestrange", "Barty Crouch Jr."];
  this.allowedSpells = ["Imperio", "Crucio"];
  this.house = "Slytherin";
  this.image = "<img src='./img/deatheaters.gif' width=300px height=250px>";
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
