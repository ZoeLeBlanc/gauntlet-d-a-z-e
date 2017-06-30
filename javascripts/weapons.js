'use strict';
var Gauntlet = (function(OldGauntlet){

  OldGauntlet.Weapons = {};

  OldGauntlet.Weapons.Weapon = function() {
    this.name = "bare hands";
    this.damage = 1;
    this.hands = 2;

    this.toString = function() {
      var weaponOutput = [
      this.name,
      " with a damage of ",
      this.damage].join("");
      // return this.name;
      return weaponOutput;
    };
  };

  OldGauntlet.Weapons.Dagger = function() {
    this.name = "dagger";
    this.damage = 4;
    this.hands = 1;
  };
  OldGauntlet.Weapons.Dagger.prototype = new OldGauntlet.Weapons.Weapon();

  OldGauntlet.Weapons.BroadSword = function() {
    this.name = "broad sword";
    this.damage = 14;
    this.hands = 2;
  };
  OldGauntlet.Weapons.BroadSword.prototype = new OldGauntlet.Weapons.Weapon();

  OldGauntlet.Weapons.WarAxe = function() {
    this.name = "war axe";
    this.damage = 18;
    this.hands = 2;
  };
  OldGauntlet.Weapons.WarAxe.prototype = new OldGauntlet.Weapons.Weapon();

  return OldGauntlet;
})(Gauntlet || {});
