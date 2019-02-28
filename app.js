let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
let pageLoaded = false;
let player = {};
let enemies = [];
let score = 0;
let isAlienUp = true;
let alienAnimationTimeout = 50;
let alienMoveX = 50;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function setUpGame() {
    //PLAYER SETUP
    let player_width = 50,
        player_height = 40,
        player_img = new Image();
        player_img.src = './ship.svg'

    // CREATE PLAYER

    player = {
        width: player_width,
        height: player_height,
        x: innerWidth / 2 - player_width / 2,
        y: innerHeight - (player_height + 10),
        draw() {
           
        //NEW stops player ship moving off screen
            if(this.x <= 0) {
                this.x = 0; 
            }else if(this.x >= (innerWidth - this.width)) {
                this.x = (innerWidth - this.width)
            }
            
            if(this.y <= 0) {
                this.y = 0; 
            }else if(this.y >= (innerHeight - this.height)) {
                this.y = (innerHeight - this.height)
            }

            c.drawImage(player_img, this.x, this.y, this.width, this.height)
        }
    }

    //ENEMY SETUP
    
    let   enemy_width = (getPercentageOfScreen(3))
    let   enemy_height = 20

    function getPercentageOfScreen (number) {
        return (canvas.width/100*number);
    }
    // FOR LOOP TO CREATE A ROW OF ENEMIES 
    
    for (let rowIndex = 0; rowIndex<3; rowIndex++) {
        for (columnIndex = 0; columnIndex < 10; columnIndex++) {
        isAlienUp = !isAlienUp;
        let enemy = {
            width: enemy_width,
            height: enemy_height,
            x:(getPercentageOfScreen(10) + (getPercentageOfScreen(7)*columnIndex)),
            y: 50 + (100*rowIndex),
            draw: function () {
                c.drawImage(GetAlienImage(), this.x, this.y, this.width, this.height)
            }
        };
        enemies.push(enemy);    }
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

function GetAlienImage ()  {
    enemy_img = new Image();
    if (isAlienUp) {
        enemy_img.src = './alien-up.svg'; 
    }else 
         {
        enemy_img.src = './alien-down.svg'; 
    }
    return enemy_img

}

function animateAliens() {
    if (alienAnimationTimeout >= 0 ) {
        alienAnimationTimeout -- } else {
            alienAnimationTimeout = 50;
            isAlienUp = !isAlienUp;
            alienMoveX = (alienMoveX + 200);
        } 
    }

    function getAlienXPosition() {
    }


function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    animateAliens();
    getAlienXPosition();


    //console.log("tick", (new Date().getSeconds()))
// SCORE 
    c.font = '18px arial';
    c.fillStyle = '#fff';
    c.fillText ('SCORE: '+score, 650, 20);
    
    player.draw();

    enemies.forEach(function (enemy) {
        enemy.draw();
    });
}

setUpGame();
animate();
