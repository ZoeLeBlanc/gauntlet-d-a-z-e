'use strict';

const player = require("./player");
const enemies = require("./enemies");
const spells = require("./spells");
const patronus = require("./patronus");
const creatures = require("./creatures");
// const config = require("./config");
const classes = require("./classes");
const battle = require("./battle");
//Set variables
let apiKeys = {};
let uid = "";

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


