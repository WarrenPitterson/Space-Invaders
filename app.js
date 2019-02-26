let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//PLAYER SETUP

let player = {},
player_width = 50,
player_height = 40,
player_img = new Image();
player_img.src = '/ship.svg'

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

//ARROW KEYS
let inputKeys = {
leftKey:37,
rightKey:39,
spacebar:32

}

addEventListener('keydown', function(event) 
{
     if (inputKeys["leftKey"] == event.keyCode) {
           player.x += -10;

       } else if (inputKeys["rightKey"] == event.keyCode) {
           player.x += 10;
       }
})

//ENEMY SETUP

let enemy = {},
enemy_width = 50,
enemy_height = 40,
enemy_img = new Image();
enemy_img.src = '/alien-up.svg'

enemy = {
    width: enemy_width,
    height: enemy_height,
    x : 50,
    y : 50,
    draw: function() {
        c.drawImage (enemy_img, this.x, this.y, this.width, this.height)
    }
 }


//ANIMATION

function animate() {
   requestAnimationFrame(animate);
   c.clearRect (0,0, canvas.width, canvas.height);
   player.draw();
   enemy.draw();
}
animate();