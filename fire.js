/******* Me Playing with previous animation**********/
var context, time, startTime, changeTime;
var catcherXPosition = 200;
var catcherYPosition = 450;
var ballX = 250;
var ballY = 50;
var ballSpeed = 3;
var catcherSpeed = 20;
var score = 0;
var dead = 0;
var gameIsUnderway = true;
var background = new Image();
background.src = "row-of-buildings.jpg";

// Begin Game
init();
animate();

function init() {
    var canvas = document.querySelector("#c");
    context = canvas.getContext( '2d' );
    startTime = new Date().getTime();

    document.addEventListener('keydown', function(event) {
        if (event.code === 'ArrowLeft'){
            catcherXPosition -= catcherSpeed;
        }
        else if (event.code === 'ArrowRight') {
            catcherXPosition += catcherSpeed;
        }
    }, false);
}

// Game loop
function animate() {
    /*** requestAnimationFrame ***/
    if (gameIsUnderway) {
        requestAnimationFrame( animate );
    }


    /*** processInput **/

    /*** move objects and enemies ***/

    // Check if the ball was caught
    if (ballY >= catcherYPosition - 20 &&
        ballY <= catcherYPosition + 20 &&
        ballX >= catcherXPosition - 10 &&
        ballX <= catcherXPosition + 55) {

        console.log("score!!!");
        score++;
        ballY = 50;
        ballX = _.random(50, 900);

        //Increase speed every 10 points
        if (score !== 0 && score % 10 === 0) {
            ballSpeed++;
        }
    }

    // Check if the ball left the screen
    if (ballY > 475) {
        ballY = 50;
        ballX = _.random(50, 900);
        console.log('death!')
        dead++;
    }

    // If dead is greater than or equal to 10, start a new game
    if (dead >= 5) {
        score = 0;
        dead = 0;
        gameIsUnderway = false;
    }

    /*** draw the updated game ***/
    if (gameIsUnderway) {
        draw();
    }

}
function draw() {

    /***** Put a grey background on the screen *****/
    //context.fillStyle = 'rgb(245,245,245)';
    //context.fillRect(0, 0, 1000, 500);
    //background.onload = function(){

    /****** Draw Buildings and stretch to size *******/
        context.drawImage(background,0,0, 1000, 500);
    //}​

    /******** Draw Moving Red Dot **********/
    ballY = ballY + ballSpeed;

    // Draw the red dot at the new x and y position
    context.fillStyle = 'rgb(255,0,0)';
    context.beginPath();
    context.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

    /*** Draw falling stick person ***/
    // ballY = ballY + ballSpeed;
    //
    // // Draw the person at the new x and y position
    // context.drawImage(img, ballX, ballY);


    /*********** Draw a rectangle that is controlled by the user *****/
    context.fillStyle = 'white';
    context.beginPath();
    context.fillRect(catcherXPosition, catcherYPosition, 50, 20);


    //Update scoreboard
    context.font = "24pt Impact";
    context.textAlign = "left";
    context.fillStyle = "black";
    context.fillText("Score: " + score, 50, 40);

    //Update number dead
    context.font = "24pt Impact";
    context.textAlign = "left";
    context.fillStyle = "black";
    context.fillText("Dead: " + dead, 300, 40);
}

function newGame() {
    console.log('refresh');
    window.location.reload();
}

function goLeft() {
    catcherXPosition -= catcherSpeed;

}

function goRight() {
    catcherXPosition += catcherSpeed;
}