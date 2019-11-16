$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var max_matches = 2;
var attempts = 0;
var games_played = 0;


function initializeApp () {
    $('.card').on('click',handleCardClick);
    //$('.container').on('click',.card,handleCardClick)
    $('.modalContainer').addClass('hidden');
    $('.restartClick').on('click',resetStats);
    // randomizeCards();
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

}


function randomizeCards () {
    var cardDeck = ['.css-logo1','.css-logo2','.docker-logo1','.docker-logo2','.gitHub-log1','.gitHub-logo2',
              '.html-logo1','.html-logo2','.js-logo1','.js-logo2','.mysql-logo1','.mysql-logo2',
              '.node-logo1','.node-logo2','.php-logo1','php-logo2','.react-logo1','.react-logo2'];
//test with 2 cards


}
/* ----------- Pseudocode ------------- */
//1. array to store classes of the images
//2. while (cardDeck.length>0),
//var = $('<div>').addClass('card')
//var j= $('<div>').addClass('front')
//var = $('<div>').addClass('back')
//var randomIndex = Math.random/floor( > cardDeck.length)
//

// var b = cardDeck.splice(randomIndex,1)
// var = j.addClass(var b)

//append variables that have() back + front ) to it's parent (card) --->  its parent ('.container')

// on('click',child,function)

//randomize front and back --> append to class 'card' --> append to class 'row'
//while loop + splice()
//

//
