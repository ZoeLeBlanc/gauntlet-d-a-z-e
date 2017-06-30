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
