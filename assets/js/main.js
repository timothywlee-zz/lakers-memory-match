$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;
var attempts = 0;
var games_played = 0;


function initializeApp() {
  $('.modalContainer').addClass('hidden');
  randomizeCards();
  addClickHandler();
  $('.resetClick').on('click',resetStats);
}

function addClickHandler() {
  $('.card').on('click', handleCardClick);
}

function removeClickHandler() {
  $('.card').off('click', handleCardClick);
}

function randomizeCards() {
  $('.card').remove();

  var cardDeck = ['a-davis', 'a-davis', 'd-green', 'd-green', 'd-howard', 'd-howard', 'kcp', 'kcp', 'kuz', 'kuz',
                  'lebron', 'lebron', 'mcgee', 'mcgee', 'rondo', 'rondo', 'a-caruso', 'a-caruso'];

  while (cardDeck.length > 0) {
    var createCard = $('<div>').addClass('card');
    var createFront = $('<div>').addClass('card-front');
    var createBack = $('<div>').addClass('card-back');

    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    var removeACardFromCardDeck = cardDeck.splice(randomIndex,1);
    var addCardToFront = createFront.addClass(removeACardFromCardDeck);

    var addCard = (createCard).append(createFront, createBack)
    $('.gameArea').append(addCard);
  }
}

function handleCardClick(event) {

  if ($(event.currentTarget).find('.card-back').hasClass('hidden')) {
    return;
  }

  $(event.currentTarget).find('.card-back').addClass('hidden');

  if(firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
  } else {
    secondCardClicked = $(event.currentTarget);
    var firstPick = $(firstCardClicked).find('.card-front').css('background-image');
    var secondPick = $(secondCardClicked).find('.card-front').css('background-image');
    removeClickHandler();

    if(firstPick === secondPick) {
      matches++;
      attempts++;
      firstCardClicked = null;
      secondCardClicked = null;
      addClickHandler();
      displayStats();
    } else {
      attempts++;
      setTimeout(function(){
        $(firstCardClicked).find('.card-back').removeClass('hidden');
        $(secondCardClicked).find('.card-back').removeClass('hidden');
        firstCardClicked = null;
        secondCardClicked = null;
        addClickHandler();
        displayStats();
      },1000);
    }
  }
  if(matches === max_matches){
    $('.modalContainer').removeClass('hidden');
  }
}

function calculateAccuracy() {
  return (matches/attempts)*100;
}

function displayStats() {
  var accuracy = calculateAccuracy();
  $('.gamesPlayedCount').text(games_played);
  $('.attemptsCount').text(attempts);
  $('.accuracyCount').text((Math.round(accuracy*10)/10) + '%');
}

function resetStats(){
  attempts = 0;
  matches = 0;
  games_played++;
  displayStats();

  if (attempts > 0) {
    return calculateAccuracy();
  } else {
    $('.accuracyCount').text('0%');
  }

  $('.modalContainer').addClass('hidden');
  $('.card').find('.card-back').removeClass('hidden');
  randomizeCards();
  addClickHandler();
}
