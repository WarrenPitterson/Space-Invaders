let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//PLAYER SETUP

let player = {},
player_width = 50,
player_height = 40,
player_img = new Image();
player_img.src = '/Users/jessburling/Desktop/CodeNation Work/spaceinvaders/ship.svg'

// CREATE PLAYER

player = {
   width: player_width,
   height: player_height,
   x : innerWidth/2 - player_width/2,
   y : innerHeight - (player_height+10),
   draw: function() {
       c.drawImage (player_img, this.x, this.y, this.width, this.height)
   }
}

//ARROW JEYS
// let map = {
//    37: false, //Left Arrow Key
//    39: false, //Right Arrow Key
//    32: false, //Spacebar Key

// }

addEventListener('keydown', function(event) {

   console.log(event);
//    if(event.keyCode in map) {
    //    map
        // [event.keyCode] = true;

       if (event.key == "ArrowLeft") {
           player.x += -10;

       } else if (event.key == "ArrowRight") {
           player.x += 10;

       }
//    }
})


//ANIMATION

function animate() {
   requestAnimationFrame(animate);
   c.clearRect (0,0, canvas.width, canvas.height);
   player.draw();
}
animate();