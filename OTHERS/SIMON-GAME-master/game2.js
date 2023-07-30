var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var flag = false;
var level = -1;
var index = -1;


//Animates the button that's pressed
function playColor(currentColor){
  var btn = $("#"+currentColor);
  btn.addClass("pressed");
  setTimeout(function(){
              btn.removeClass('pressed');
      }, 50);

  var audio = new Audio("sounds/"+currentColor+".mp3");
  audio.play();

}

//Plays the sound
function playSound(currentColor){
  var audio = new Audio("sounds/"+currentColor+".mp3");
  audio.play();
}



// Should be used for level upgrade
function nextSequence(){
  // Upgrading level and displaying it.
  level += 1;
  $('#level-title').text("Level "+level);

  // Choosing random color, and incrementing the array with the new one
  var randomNumber = Math.floor(Math.random()*4);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);

  // Animating it
  $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);

}

// Restarting the game
function startOver(){
  // No color is selected
  gamePattern  = [];
  // No index is used
  index = -1
  // No game played
  level = -1;
  // First key didn't got pressed
  flag = false;

}



// Requesting for key press.
// When it's pressed,
// Automatically color will be played
// Added to the list
// Will only execute once
// Next is our chance to press on
$(document).on('keypress',function(e) {
    if(flag == false) {
      flag = true;
      nextSequence();
    }
});


// New level? index starts from zero.
// Button clicked, campare with our index.
// If not equal game over.




// When the button is pressed
$(".btn").click(function (event) {

  // Game started, random key was pressed before
  if(flag == true){

    // Got the next color
    var userChoosenColor = this.id;
    // Got the index of the color from 0
    index += 1

    // If the color pressed is wrong, then give info and end the game
    if(userChoosenColor != gamePattern[index]){
      playSound("wrong");

      var body = $("body");
      body.addClass("game-over");
      setTimeout(function(){
                  body.removeClass('game-over');
          }, 200);

    $("h1").text("Game Over, press any key to Restart");

    startOver();
    }
    // Else play it, if it reached the end then level up
    else{
      playColor(userChoosenColor);

      // When the index reached end of gamePattern
      if(index === gamePattern.length-1){
        setTimeout(function(){
                    nextSequence();
            }, 500);
        // Level up
        // New color is played
        // It is added

        // This will end the press function
        // When the next function starts
        // index should begin from 0
        index = -1;

      }

    }




  }

});
