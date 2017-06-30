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

