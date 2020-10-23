var ifFirstTime = true;
var level=0;
var gamePattern= [];
var userClikedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomNumber;
var randomChosenColor;
var sound;
var userChosenColor;
var ifCorrect;

function nextSequence() {
  ++level;
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name){
  sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor){
      setTimeout(function(){
        $("#" + currentColor).removeClass("pressed").delay(100);
      },100);
  $("#" + currentColor).addClass("pressed");
}

function checkPattern(){
  console.log(userClikedPattern);
  console.log(gamePattern);
  for(var i=0; i < userClikedPattern.length; ++i){
    if(gamePattern[i]!=userClikedPattern[i])
       return false;
  }
  return true;
}

function gameOver(){
  setTimeout(function(){
    $("body").removeClass("game-over").delay(200);
  }, 200);
  $("body").addClass("game-over");
}

function startOver(){
  userClikedPattern=[];
  gamePattern=[];
  ifFirstTime=true;
  level=0;
}

$(document).keydown(function(event){
  if(ifFirstTime)
  {
    nextSequence();
    ifFirstTime=false;
  }
});

$(".btn").click(function(event){
  userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClikedPattern.push(userChosenColor);
  if(checkPattern()){
     if((userClikedPattern.length)==(gamePattern.length))
     {
       console.log("Success");
       userClikedPattern=[];
       setTimeout(nextSequence, 1000);
     }
     else {
           console.log("Still Not Over");
          }
   }
else{
  console.log("Game Over");
  gameOver();
  startOver();
  $("#level-title").text("Game Over, Press Any Key to Restart");

}

});
