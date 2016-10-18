/*
  TODO: Modularize this code with IIFE or Browserify
 */

var Gauntlet = (function(OldGauntlet) {
  OldGauntlet.Combatants = {};
    /*
      Define the base object for any player of Gauntlet,
      whether a human player or a monster.
     */
    OldGauntlet.Combatants.Player = function(name = "unknown adventurer") {
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

    OldGauntlet.Combatants.Player.prototype.generateHouse = function() {
      // Get a random index from the allowed classes array
      var random = Math.round(Math.random() * (this.allowedHouses.length - 1));

      // Get the string at the index
      var randomClass = this.allowedHouses[random];

      // Composes the corresponding player class into the player object
      this.house = new OldGauntlet.Hogwarts[randomClass]();

      // Add the health bonus
      // this.health += this.class.healthBonus;
      return this.house;
    };

    OldGauntlet.Combatants.Player.prototype.generateSpell = function() {
      // Get a random index from the allowed classes array
      var random = Math.round(Math.random() * (this.allowedSpells.length - 1));

      // Get the string at the index

      var randomClass = this.allowedSpells[random];

      // Composes the corresponding player class into the player object
      this.spell = new OldGauntlet.SpellBook[randomClass]();

      // Add the health bonus
      // this.damage += this.class.healthBonus;
      return this.spell;
    };

    OldGauntlet.Combatants.Player.prototype.generateCreature = function() {
      // Get a random index from the allowed classes array
      var random = Math.round(Math.random() * (this.allowedCreatures.length - 1));

      // Get the string at the index
      var randomClass = this.allowedCreatures[random];

      // Composes the corresponding player class into the player object
      this.creature = new OldGauntlet.Creatures[randomClass]();

      // Add the health bonus
      // this.health += this.class.healthBonus;
      return this.creature;
    };

    /*
      Define the base properties for a human in a
      constructor function.
     */
    OldGauntlet.Combatants.Wizard = function() {
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
          "<br />",
          this.house,
          "<br />",
          this.patronus,
          "<br />",
          this.health,
          " Health"
        ].join("");
        return output;
      };
    };
    OldGauntlet.Combatants.Wizard.prototype = new OldGauntlet.Combatants.Player();


    /*
      Define the base properties for a monster in a
      constructor function.
     */
    OldGauntlet.Combatants.DeathEater = function() {
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

    OldGauntlet.Combatants.DeathEater.prototype = new OldGauntlet.Combatants.Player();

    return OldGauntlet;
})(Gauntlet || {});
