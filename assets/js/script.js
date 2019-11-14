$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;

function initializeApp () {
  $('.card').on('click',handleCardClick);
  $('.modalContainer').addClass('hidden');
  // blah();
  //$('.restartClick).on('click',resetGame);
}

function handleCardClick(event) {
  $(event.currentTarget).find('.back').addClass('hidden');


  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
  } else {
    secondCardClicked = $(event.currentTarget);
  }
  if (firstCardClicked !== null && secondCardClicked !== null) {
        var firstChoice = $(firstCardClicked).find('.front').css('background-image');
        var secondChoice = $(secondCardClicked).find('.front').css('background-image');

      if(firstChoice === secondChoice) {
        matches += 1;
        console.log('The cards do match! :)');
        firstCardClicked = null;
        secondCardClicked = null;
      }else {
          setTimeout(function () {
          firstCardClicked.find('.back').removeClass('hidden');
          secondCardClicked.find('.back').removeClass('hidden');
          firstCardClicked = null; //set the cards back to null because if you dont, when you choose a third card, the firstCardClicked will still be the 'card' you clicked previously.. its still being assigned to that one. so you gotta set it back to 'null'.
          secondCardClicked = null;
          }, 1500);
          console.log('The cards do not match :(')
    }
  }
  winMatch();
}

function winMatch() {
   if(matches === max_matches) {
      $('.modalContainer').removeClass('hidden');
   }
};

// function resetGame() {

// }
