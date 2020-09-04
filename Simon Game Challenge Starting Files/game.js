gamePattern = [];
userClickedPattern = [];
buttonColors = ["red", "blue", "green", "yellow"];

var level=0;
var start = false;

$(document).keypress(function(){
if(!start){
  $("#level-title").text("Level " + level);
    nextSequence();
    start=true;

  }
})

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound("sounds/"+userChosenColour+".mp3");
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("Success");

    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();

      }, 1000);

    }

  }

  else{

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

  startOver();
  }
}


function nextSequence() {
    userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound("sounds/"+randomChosenColour+".mp3");
animatePress(userChosenColour);


}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
      $("#"+currentColor).removeClass("pressed");
  }, 100);

}


function playSound(name){
  var audio = new Audio(name);
  audio.play();
}

function startOver(){
  level=0;
  gamePattern=[];
  start=false;
}
