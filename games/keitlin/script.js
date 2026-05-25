let player = document.getElementById("player");
let obstacle = document.getElementById("obstacle");
let text = document.getElementById("text");

let jumping = false;

document.addEventListener("keydown", function(event){

if(event.code === "Space" && jumping === false){

jump();

}

});

function jump(){

jumping = true;

let position = 0;

let up = setInterval(function(){

if(position >= 150){

clearInterval(up);

let down = setInterval(function(){

if(position <= 0){

clearInterval(down);

jumping = false;

} else {

position -= 5;

player.style.bottom = position + "px";

}

},20);

} else {

position += 5;

player.style.bottom = position + "px";

}

},20);

}

let checkDead = setInterval(function(){

let playerBottom =
parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));

let obstacleLeft =
parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

if(obstacleLeft < 150 &&
obstacleLeft > 50 &&
playerBottom < 50){

text.textContent = "Mäng läbi!";

obstacle.style.animation = "none";

}

},10);
