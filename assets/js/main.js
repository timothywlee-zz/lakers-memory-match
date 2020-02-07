$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 1;
var attempts = 0;
var games_played = 0;


function initializeApp() {
  $('.begModalPlay').on('click', startBeginningModal);
  randomizeCards();
  addClickHandler();
  $('.resetClick').on('click',resetStats);
}

function startBeginningModal () {
  $('.beginningModal').addClass('hidden');
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

  if ($(event.currentTarget).hasClass('clicked')) {
    return;
  }

  if(firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget).addClass('clicked');
  } else {
    secondCardClicked = $(event.currentTarget).addClass('clicked');
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
        $(firstCardClicked).removeClass('clicked');
        $(secondCardClicked).removeClass('clicked');
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
  return Math.round(((matches/attempts) * 100) *10/10) + '%';
}

function displayStats() {
  var accuracy = calculateAccuracy();
  $('.gamesPlayedCount').text(games_played);
  $('.attemptsCount').text(attempts);
  $('.accuracyCount').text(accuracy);
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

  $('.card').find('.card-back').removeClass('hidden');
  $('.modalContainer').addClass('hidden');
  randomizeCards();
  addClickHandler();
}
