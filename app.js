let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
let pageLoaded = false;
let player_img = new Image();
player_img.src = './ship.svg'
let player = {
    width: 50,
    height: 40,
    x: innerWidth / 2 - 25,
    y: innerHeight - 50,
    draw() {
        if (this.x <= 0) {
            this.x = 0;
        } else if (this.x >= (innerWidth - this.width)) {
            this.x = (innerWidth - this.width)
        }
        c.drawImage(player_img, this.x, this.y, this.width, this.height)
    }
}
let enemies = [];
let missle = {};
let missles = [];
let score = 0;
let isAlienUp = true;
let alienAnimationTimeoutX = 10;
let alienAnimationTimeoutY = 50;
let alienMoveX = 10;
let alienMoveY = 10;
let alienLeft = true;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getAlienYPosition(rowIndex) {
    let returnYresult = 200 + (50 * rowIndex)
    return returnYresult
}

addEventListener('keydown', function (event) {
    if (event.key == "ArrowLeft") {
        player.x -= 30;
    } else if (event.key == "ArrowRight") {
        player.x += 30;
    }
})


function createMissle() {
    for (i = 0; i < 1; i++) {
        missle_img = new Image();
        missle_img.src = './missle.png'
        missle = {
            width: 50,
            height: 50,
            x: player.x,
            y: player.y,
            draw() {
                c.drawImage(missle_img, this.x, this.y, this.width, this.height)
            }
        };
        missles.push(missle);
    }

    addEventListener('keydown', function (event) {
        if (event.key == "Space") {
            missle.y -= 500;
        }
    })
}


for (rowIndex = 0; rowIndex < 3; rowIndex++) {
    createEnemy(rowIndex)
}

function createEnemy(rowIndex) {
    for (columnIndex = 0; columnIndex < 10; columnIndex++) {
        let enemy = {
            width: (getPercentageOfScreen(3)),
            height: 20,
            x: getAlienXPosition(columnIndex),
            y: getAlienYPosition(rowIndex),
            draw() {
                c.drawImage(GetAlienImage(), this.x, this.y, this.width, this.height)
            }
        };
        enemies.push(enemy);
    }
}

// function deleteEnemy() {
//     enemies.pop[enemy];
// }

function GetAlienImage() {
    enemy_img = new Image();
    if (isAlienUp) {
        enemy_img.src = './alien-up.svg';
    } else {
        enemy_img.src = './alien-down.png';
    }
    return enemy_img
}

// function AlienOffScreen() {
//     enemies.forEach(function (enemy) {
//         (enemy.x >= (canvas.width - enemy.x)); {
//             enemy.x = (canvas.width - enemy.x)
//         }
//     }
//     )}

    function animationTimeoutY() {
        if (alienAnimationTimeoutY >= 0) {
            alienAnimationTimeoutY--
        } else {
            alienAnimationTimeoutY = 200;
            moveAlienY();
        }
    }

    function animationTimeoutX() {
        if (alienAnimationTimeoutX >= 0) {
            alienAnimationTimeoutX--
        } else {
            alienAnimationTimeoutX = 10;
            isAlienUp = !isAlienUp;
            moveAlienRight();
        }
    }

    function moveAlienY() {
        alienMoveY = (alienMoveY + 1);
        enemies.forEach(enemy => {
            enemy.y = enemy.y + alienMoveY
        })
    }

    function moveAlienRight() {
        alienMoveX = (alienMoveX + 1);
        enemies.forEach(enemy => {
            enemy.x = enemy.x + alienMoveX
        })
    }

    function moveAlienLeft() {
        alienMoveX = (alienMoveX + 1);
        enemies.forEach(enemy => {
            enemy.x = enemy.x - alienMoveX
        })
    }

    // function alienLeft() {
    //     if (alienLeft) {
    //         moveAlienLeft() 
    //     } else {
    //         moveAlienRight()
    //     }
    // }

    function getAlienXPosition(columnIndex) {
        let margin = getPercentageOfScreen(10);
        let spaceBetweenEnemies = getPercentageOfScreen(8);
        let returnResult = margin + (spaceBetweenEnemies * columnIndex);
        return returnResult;
    }

    function getPercentageOfScreen(number) {
        return (canvas.width / 100 * number);
    }

    createMissle();
    moveAlienY();
    //AlienOffScreen();

    function animate() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(animate);
        animationTimeoutX();
        animationTimeoutY();

        //console.log("tick", (new Date().getSeconds()))
        c.font = '18px arial';
        c.fillStyle = '#fff';
        c.fillText('SCORE: ' + score, 650, 20);
        player.draw();
        missles.forEach(function (missle) {
            missle.draw();
        });
        enemies.forEach(function (enemy) {
            enemy.draw();
        });
    }
    animate();
    