let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
let pageLoaded = false;
let player = {};
let enemies = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


function setUpGame() {
    //PLAYER SETUP
    let player_width = 50,
        player_height = 40,
        player_img = new Image();
        player_img.src = '/ship.svg'

    // CREATE PLAYER

    player = {
        width: player_width,
        height: player_height,
        x: innerWidth / 2 - player_width / 2,
        y: innerHeight - (player_height + 10),
        draw: function () {
            c.drawImage(player_img, this.x, this.y, this.width, this.height)
        }
    }

    //ENEMY SETUP
    let enemy = {},
        enemy_width = (getPercentageOfScreen(5)),
        enemy_height = 40,
        enemy_img = new Image();
    enemy_img.src = '/alien-up.svg'; 

    function getPercentageOfScreen (number) {
        return (canvas.width/100*number);
    }
    // FOR LOOP TO CREATE A ROW OF ENEMIES 
    for (i = 0; i < 10; i++) {
        enemy = {
            width: enemy_width,
            height: enemy_height,
            x: (getPercentageOfScreen(10) + (getPercentageOfScreen(8)*i)),
            y: 50,
            draw: function () {
                c.drawImage(enemy_img, this.x, this.y, this.width, this.height)
            }
        };
        enemies.push(enemy);
    }
}

//ARROW KEYS
let inputKeys = {
    leftKey: 37,
    rightKey: 39,
    spacebar: 32
}

addEventListener('keydown', function (event) {
    if (inputKeys["leftKey"] == event.keyCode) {
        player.x += -10;

    } else if (inputKeys["rightKey"] == event.keyCode) {
        player.x += 10;
    }
})

//ANIMATION

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    player.draw();

    enemies.forEach(function (enemy) {
        enemy.draw();
    });
}

setUpGame();
animate();