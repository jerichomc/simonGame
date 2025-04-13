
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                userClickedPattern = [];
                nextSequence();
            }, 1000); // Add a 1000ms delay before next sequence
        }
    } else {
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200); // Add a 200ms delay

        startOver(); // Reset the game
    }
}

function playSound(name) {
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100); // Add a 100ms delay
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Replay the full sequence
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function () {
            let color = gamePattern[i];
            $("#" + color)
                .fadeOut(100)
                .fadeIn(100)
                .fadeOut(100)
                .fadeIn(100);
            playSound(color);
        }, i * 600); // delay increases with each step
    }
}

$(".btn").on("click", function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function() {
    if (!started) {
        nextSequence();
        $("h1").text("Level " + level);
        started = true;
    }
});