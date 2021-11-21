var highestTimeoutId = setTimeout(";");
for (var i = 0 ; i < highestTimeoutId ; i++) {
  clearTimeout(i); 
}

const col = {"level1":{"rect":["rect1", "rect2", "rect3", "rect4", "rect5"],"rect1":{"xpos":100,"ypos":200,"rectwidth":100,"rectheight":50},"rect2":{"xpos":200,"ypos":200,"rectwidth":100,"rectheight":50},"rect3":{"xpos":200,"ypos":00,"rectwidth":100,"rectheight":120},"rect4":{"xpos":100,"ypos":70,"rectwidth":100,"rectheight":50},"rect5":{"xpos":360,"ypos":70,"rectwidth":100,"rectheight":200},"vict":{"xpos":450,"ypos":200,"rectwidth":50,"rectheight":50},"playerspawn":{"x":30,"y":130},"enem":{"xpos":50000,"ypos":50000,"rectwidth":50,"rectheight":50}},"level2":{"rect":["rect1", "rect2", "rect3", "rect4", "rect5", "rect6"],"rect1":{"xpos":130,"ypos":50,"rectwidth":50,"rectheight":50},"rect2":{"xpos":130,"ypos":150,"rectwidth":50,"rectheight":50},"rect3":{"xpos":70,"ypos":-20,"rectwidth":10,"rectheight":150},"rect4":{"xpos":220,"ypos":150,"rectwidth":10,"rectheight":100},"rect5":{"xpos":360,"ypos":70,"rectwidth":10,"rectheight":200},"rect6":{"xpos":280,"ypos":0,"rectwidth":10,"rectheight":200},"vict":{"xpos":450,"ypos":200,"rectwidth":50,"rectheight":50},"playerspawn":{"x":10,"y":10},"enem":{"xpos":180,"ypos":100,"rectwidth":50,"rectheight":50}},"level3":{"rect":["rect1", "rect2", "rect3"],"rect1":{"xpos":360,"ypos":70,"rectwidth":100,"rectheight":200},"rect2":{"xpos":200,"ypos":00,"rectwidth":100,"rectheight":120},"rect3":{"xpos":100,"ypos":70,"rectwidth":100,"rectheight":50},"vict":{"xpos":450,"ypos":200,"rectwidth":50,"rectheight":50},"playerspawn":{"x":30,"y":130},"enem":{"xpos":100,"ypos":160,"rectwidth":200,"rectheight":100}}}; //This json contains all levels + staring position for player in all levels, since the json does contains arrays (ex  the rect key) plus those are used for the drawmap func I consider this use of arrays
var level = col['level1'];

var lvlid = 1;
var winaudio = new Audio('win.wav');
var loseaudio = new Audio('lose.mp3');
var playerx = (level['playerspawn'])['x'];
var oldplayerx = playerx;
var playery = (level['playerspawn'])['y'];;
var oldplayery = playery;
var playerwidth = 30;
var oldplayerwidth = playerwidth;
var playerheight = 30;
var oldplayerheight = playerheight;
const maxplayerheight = playerheight;
const maxplayerwidth = playerwidth;
const maxplayerx = playerx;
const maxplayery = playery;
var tmp = 0;
window.lefton = 0;
window.righton = 0;
window.upon = 0;
window.downon = 0;
window.keyinuse = 0;
var idVar;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
// ctx.beginPath();
// ctx.lineWidth = "10";
// ctx.strokeStyle = "blue";
// ctx.rect(50, 50, 100, 0);
// ctx.stroke();
// ctx.beginPath();
// ctx.lineWidth = "10";
// ctx.strokeStyle = "green";
// ctx.rect(50, 80, 1000, 0);
// ctx.stroke();
ctx.fillStyle = '#FFFFF';
ctx.fillRect(playerx, playery, playerwidth, playerheight);
document.addEventListener('keydown', function(event) {
  if (event.keyCode == 37) {
    if (lefton == 0){
      window.lefton = 1;
      window.righton = 0;
      window.upon = 0;
      window.downon = 0;
      window.keyinuse = "left";
    }
  } else {
    
  }
  if (event.keyCode == 39) {
    if (righton == 0){
      window.righton = 1;
      window.lefton = 0;
      window.upon = 0;
      window.downon = 0;
      window.keyinuse = "right";
    }
  } else {
  
  }
  if (event.keyCode == 38) {
    if (upon == 0){
      window.upon = 1;
      window.downon = 0;
      window.righton = 0;
      window.lefton = 0;
      window.keyinuse = "up";
    }
  } else {
  
  }
  if (event.keyCode == 40) {
    if (downon == 0){
      window.downon = 1;
      window.upon = 0;
      window.righton = 0;
      window.lefton = 0;
      window.keyinuse = "down";
    }
  } else {
   
  }

  if (event.keyCode == 82) {
    repos();
  }

});

document.addEventListener('keyup', function(event) {
  switch (keyinuse){
    case "left":
      window.lefton = 0;
      ctx.clearRect(oldplayerx-1, oldplayery + ((maxplayerheight - oldplayerheight)/2)-1, oldplayerwidth+2, oldplayerheight+2);
      break;
    case "right":
      window.righton = 0;
      ctx.clearRect(oldplayerx-1, oldplayery + ((maxplayerheight - oldplayerheight)/2)-1, oldplayerwidth+2, oldplayerheight+2);
      break;
    case "up":
      window.upon = 0;
      ctx.clearRect(oldplayerx - ((maxplayerheight - oldplayerheight)/2)-1, oldplayery-1, oldplayerwidth+2, oldplayerheight+2);
      break;
    case "down":
      window.downon = 0;
      ctx.clearRect(oldplayerx - ((maxplayerheight - oldplayerheight)/2)-1, oldplayery-1, oldplayerwidth+2, oldplayerheight+2);
      break;
  }
  downon = 0;
  lefton = 0;
  righton = 0;
  upon = 0;
});

function movefunc(){
  if (lefton == 1) {
    // Left
    //Detect levellision
    for (let i = 0; i < level['rect'].length; i++) {
      if (playerx - 1 > (level[((level['rect'])[i])])['xpos'] && playerx - 1 < ((level[((level['rect'])[i])])['xpos'] + (level[((level['rect'])[i])])['rectwidth'])  && playery + playerheight - 1 > (level[((level['rect'])[i])])['ypos'] && playery + 1 < ((level[((level['rect'])[i])])['ypos'] + (level[((level['rect'])[i])])['rectheight'])){
        tmp++;
      }
    }

    //if no levellision
    if (tmp == 0){
      oldplayerx = playerx;
      playerx -= 1;
      oldplayery = playery;
      oldplayerwidth = playerwidth;
      oldplayerheight = playerheight;
      if (playerwidth < (maxplayerwidth*1.2)) {playerwidth += 0.5};
      if (playerheight > (maxplayerheight*0.8)) {playerheight -= 0.5};
      //delete old rect
      ctx.clearRect(oldplayerx-1, oldplayery + ((maxplayerheight - oldplayerheight)/2)-1, oldplayerwidth+2, oldplayerheight+2);
      //make new rect
      ctx.fillRect(playerx, playery + ((maxplayerheight - playerheight)/2), playerwidth, playerheight);
    }
    tmp = 0;
  } if (righton == 1) {
      // Right
      //Detect levellision
      for (let i = 0; i < level['rect'].length; i++) {
        if (playerx + playerwidth - 1 > (level[((level['rect'])[i])])['xpos'] && playerx + playerwidth - 1 < ((level[((level['rect'])[i])])['xpos'] + (level[((level['rect'])[i])])['rectwidth'])  && playery + playerheight - 1 > (level[((level['rect'])[i])])['ypos'] && playery + 1 < ((level[((level['rect'])[i])])['ypos'] + (level[((level['rect'])[i])])['rectheight'])){
          tmp++;
        }
      }

      //if no levellision
      if (tmp == 0){
        oldplayerx = playerx;
        playerx += 1;
        oldplayery = playery;
        oldplayerwidth = playerwidth;
        oldplayerheight = playerheight;
        if (playerwidth < (maxplayerwidth*1.2)) {playerwidth += 0.5};
        if (playerheight > (maxplayerheight*0.8)) {playerheight -= 0.5};
        ctx.clearRect(oldplayerx-1, oldplayery + ((maxplayerheight - oldplayerheight)/2)-1, oldplayerwidth+2, oldplayerheight+2);
        ctx.fillRect(playerx, playery + ((maxplayerheight - playerheight)/2), playerwidth, playerheight);
      }
      tmp = 0;
  } if (upon == 1) {
      // Up
      //Detect levellision
      for (let i = 0; i < level['rect'].length; i++) {
        if (playerx + playerwidth + 1 > (level[((level['rect'])[i])])['xpos'] && playerx + 1 < ((level[((level['rect'])[i])])['xpos'] + (level[((level['rect'])[i])])['rectwidth'])  && playery + 1 < ((level[((level['rect'])[i])])['ypos']) + (level[((level['rect'])[i])])['rectheight'] && playery + playerheight + 1 > ((level[((level['rect'])[i])])['ypos'])){
          tmp++;
        }
      }

      //if no levellision
      if (tmp == 0){
        oldplayery = playery;
        playery -= 1;
        oldplayerx = playerx;
        oldplayerwidth = playerwidth;
        oldplayerheight = playerheight;
        if (playerwidth > (maxplayerwidth*0.8)) {playerwidth -= 1};
        if (playerheight < (maxplayerheight*1.2)) {playerheight += 1};
        ctx.clearRect(oldplayerx - ((maxplayerheight - oldplayerheight)/2)-1, oldplayery-1, oldplayerwidth+2, oldplayerheight+2);
        ctx.fillRect(playerx - ((maxplayerheight - playerheight)/2), playery, playerwidth, playerheight);
      }
      tmp = 0;
  } if (downon == 1) {
      // Down
      //Detect levellision
      for (let i = 0; i < level['rect'].length; i++) {
        if (playerx + playerwidth + 1 > (level[((level['rect'])[i])])['xpos'] && playerx + 1 < ((level[((level['rect'])[i])])['xpos'] + (level[((level['rect'])[i])])['rectwidth'])  && playery + 1 < ((level[((level['rect'])[i])])['ypos']) + (level[((level['rect'])[i])])['rectheight'] && playery + playerheight + 1 > ((level[((level['rect'])[i])])['ypos'])){
          tmp++;
        }
      }

      //if no levellision
      if (tmp == 0){
        oldplayery = playery;
        playery += 1;
        oldplayerx = playerx;
        oldplayerwidth = playerwidth;
        oldplayerheight = playerheight;
        if (playerwidth > (maxplayerwidth*0.8)) {playerwidth -= 1};
        if (playerheight < (maxplayerheight*1.2)) {playerheight += 1};
        ctx.clearRect(oldplayerx - ((maxplayerheight - oldplayerheight)/2)-1, oldplayery-1, oldplayerwidth+2, oldplayerheight+2);
        ctx.fillRect(playerx - ((maxplayerheight - playerheight)/2), playery, playerwidth, playerheight);
      }
      tmp = 0;
  } if (lefton == 0 && righton == 0 && upon == 0 && downon == 0){
    oldplayerwidth = playerwidth;
    oldplayerheight = playerheight;
    if (playerwidth > maxplayerwidth ) {playerwidth -= 2};
    if (playerwidth < maxplayerwidth ) {playerwidth += 2};
    if (playerheight > maxplayerheight) {playerheight -= 2};
    if (playerheight < maxplayerheight) {playerheight += 2};
    if (keyinuse == "right" || keyinuse == "left"){
    ctx.clearRect(playerx-1, playery + ((maxplayerheight - oldplayerheight)/2)-1, oldplayerwidth+2, oldplayerheight+2);
    ctx.fillRect(playerx, playery + ((maxplayerheight - playerheight)/2), playerwidth, playerheight);
    } else if (keyinuse == "up" || keyinuse == "down"){
      ctx.clearRect(playerx - ((maxplayerheight - oldplayerheight)/2)-1, playery-1, oldplayerwidth+2, oldplayerheight+2);
      ctx.fillRect(playerx - ((maxplayerheight - oldplayerheight)/2)-1, playery, playerwidth, playerheight);
    }
  }
  if (playerx+playerwidth > (level['vict'])['xpos'] && (!(playerx > (level['vict'])['xpos'] + (level['vict'])['rectwidth'])) && playery+playerheight > (level['vict'])['ypos'] && (!(playery > (level['vict'])['ypos'] + (level['vict'])['rectheight']))){
    winaudio.play();
    lvlid += 1;
    drawmap(); //needed for the level variable to refresh
    repos();
  }
  if (playerx+playerwidth > (level['enem'])['xpos'] && (!(playerx > (level['enem'])['xpos'] + (level['enem'])['rectwidth'])) && playery+playerheight > (level['enem'])['ypos'] && (!(playery > (level['enem'])['ypos'] + (level['enem'])['rectheight']))){
    loseaudio.play();
    lvlid -= 1;
    drawmap(); //needed for the level variable to refresh
    repos();
  }
  drawmap();
}

function drawmap(){
  switch (lvlid){
    case 1:
      level = col['level1'];
      break;
    case 2:
      level = col['level2'];
      break;
    case 3:
      level = col['level3'];
      break;
    default:
      window.location.replace("win.html");
      highestTimeoutId = setTimeout(";");
      for (var i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
}
  }
  for (let i = 0; i < level['rect'].length; i++) {
    ctx.fillRect((level[((level['rect'])[i])])['xpos'], (level[((level['rect'])[i])])['ypos'], (level[((level['rect'])[i])])['rectwidth'], (level[((level['rect'])[i])])['rectheight']);
  }
  ctx.fillStyle = "orange";
  ctx.fillRect((level['vict'])['xpos'],(level['vict'])['ypos'], (level['vict'])['rectwidth'], (level['vict'])['rectheight']);
  ctx.fillStyle = "red";
  ctx.fillRect((level['enem'])['xpos'],(level['enem'])['ypos'], (level['enem'])['rectwidth'], (level['enem'])['rectheight']);
  ctx.fillStyle = "black";
}

function repos(){
  window.downon = 0;
  window.upon = 0;
  window.righton = 0;
  window.lefton = 0;
  ctx.clearRect(0, 0, c.width, c.height); //cls
  playerx = (level['playerspawn'])['x'];
  oldplayerx = playerx;
  playery = (level['playerspawn'])['y'];;
  oldplayery = playery;
  playerwidth = 40;
  oldplayerwidth = playerwidth;
  playerheight = 40;
  oldplayerheight = playerheight;
  ctx.fillRect(playerx, playery, playerwidth, playerheight);
}
drawmap();
setInterval(movefunc, 10);