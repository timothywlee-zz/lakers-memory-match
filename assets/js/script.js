$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

function initializeApp () {
  $('.card').on('click',handleCardClick);
}

function handleCardClick(event) {
  $(event.currentTarget).find('.back').addClass('hidden');


  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
    // firstCardClicked.find('.back').addClass('hidden');
  } else {
    secondCardClicked = $(event.currentTarget);
    // secondCardClicked.find('.back').addClass('hidden');
  }
  if (firstCardClicked !== null && secondCardClicked !== null) {
        var firstChoice = $(firstCardClicked).find('.front').css('background-image');
        var secondChoice = $(secondCardClicked).find('.front').css('background-image');

      if(firstChoice === secondChoice) {
        matches += 1;
        console.log('cards match!');
        firstCardClicked = null;
        secondCardClicked = null;
      }else {
          setTimeout(function () {
          firstCardClicked.find('.back').removeClass('hidden');
          secondCardClicked.find('.back').removeClass('hidden');
          firstCardClicked = null;
          secondCardClicked = null;
          }, 1500);
    }
  }
}
