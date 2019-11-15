$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var max_matches = 2;
var attempts = 0;
var games_played = 0;


function initializeApp () {
    $('.card').on('click',handleCardClick);
    $('.modalContainer').addClass('hidden');
    $('.restartClick').on('click',resetStats);
}

function removeClickHandler (){
    $(".card").off("click", handleCardClick)
}

function addClickHandler () {
    $(".card").on("click", handleCardClick)
}

function handleCardClick(event) {
  if ($(event.currentTarget).find('.back').hasClass('hidden')) {
    return;
  }

  $(event.currentTarget).find('.back').addClass('hidden');


  if (firstCardClicked === null) {
      firstCardClicked = $(event.currentTarget);
  } else {
      secondCardClicked = $(event.currentTarget);
      var firstChoice = $(firstCardClicked).find('.front').css('background-image');
      var secondChoice = $(secondCardClicked).find('.front').css('background-image');
      removeClickHandler();

    if (firstChoice === secondChoice) {
        matches++;
        attempts++;
        console.log('The cards do match! :)');
        firstCardClicked = null;
        secondCardClicked = null;
        addClickHandler();
        displayStats();
    } else {
        attempts++;
        setTimeout(function () {
            firstCardClicked.find('.back').removeClass('hidden');
            secondCardClicked.find('.back').removeClass('hidden');
            firstCardClicked = null; //set the cards back to null because if you dont, when you choose a third card, the firstCardClicked will still be the 'card' you clicked previously.. its still being assigned to that one. so you gotta set it back to 'null'.
            secondCardClicked = null;
            addClickHandler();
            displayStats();
        }, 1000);
          console.log('The cards do not match :(')
    }
  }
    if (matches === max_matches) {
       $('.modalContainer').removeClass('hidden');
   }
}

function calculateAccuracy() {
    return (matches/attempts)*100 ;
}

function displayStats () {
    console.log('****TEST****')
    var accuracy = calculateAccuracy();
    console.log('attempts: ', attempts);
    console.log('games played: ', games_played);
    $('.gamesPlayedNum').text(games_played);
    $('.attemptsNum').text(attempts);
    $('.accuracyNum').text((Math.round(accuracy*10)/10) +'%');
}

function resetStats() {
    matches = 0;
    attempts = 0;
    games_played++;
    displayStats();
    console.log("gamesplayed count: ", games_played)
    if (attempts > 0) {
      return calculateAccuracy();
    } else {
      $('.accuracyNum').text('0%');
    }
    $('.modalContainer').addClass('hidden');
    $('.card').find('.back').removeClass('hidden');
}



/* ----------- Notes ------------- */
//random commit
