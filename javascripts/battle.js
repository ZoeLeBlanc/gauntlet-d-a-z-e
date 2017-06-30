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