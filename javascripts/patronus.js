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
