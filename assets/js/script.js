$(document).ready(initializeApp); //DOM manipulation where the function 'initializeapp' is passed into the document object where it is passed into the ready() method that executes all jquery and javascript code.

var firstCardClicked = null; //when there is no current value for the first click
var secondCardClicked = null; //when there is no current value for the second click
var matches = 0; //the total number of card pairs that were matched
var max_matches = 2; //the max number of card pairs that can be matched for the game to end
var attempts = 0; //the current number of attempts to match a pair in a single game (attempts+=1 after two clicks)
var games_played = 0; //the total number of games played (games_played+=1 after win per game)


function initializeApp () { //the function handler that executes all the other functions immediately after the document is loaded.
    $('.modalContainer').addClass("hidden"); //hides the modal Container immediately when document is executed so the user won't see it at first until it is called back
    randomizeCards(); //executes the randomizeCards function
    $('.card').on('click',handleCardClick); //when a card is clicked, it would run the function 'handleCardClick'
    $('.restartClick').on('click',resetStats); //allows the user to click 'play again' which runs the function 'resetStats' that restarts the game
}

function randomizeCards() { //the function that executes code to shuffle the cards randomly
  var cardDeck = ['css-logo', 'css-logo', 'docker-logo', 'docker-logo', 'gitHub-logo', 'gitHub-logo',
                  'html-logo', 'html-logo', 'js-logo', 'js-logo', 'mysql-logo', 'mysql-logo',
                  'node-logo', 'node-logo', 'php-logo', 'php-logo', 'react-logo', 'react-logo']; //an array that holds the images

  while (cardDeck.length > 0) { // execute this while-loop only when the cardDeck has a current value that is greater than 0.
    var createCard = $('<div>').addClass('card'); // makes a div per card made
    var createFront = $('<div>').addClass('front'); //makes a div for the front of each card
    var createBack = $('<div>').addClass('back'); //makes a div for the back of each card

    var randomIndex = Math.floor(Math.random() * cardDeck.length); //random method used to randomize the images in the cardDeck array.

    var removeACardFromCardDeck = cardDeck.splice(randomIndex, 1); //removes one random card from the cardDeck array

    var addCardToFront = createFront.addClass(removeACardFromCardDeck); //where the single random card that was removed from the array is now added to the div with the class of front.

    // createFront.appendTo(createCard);
    // createBack.appendTo(createCard);
    // createCard.appendTo('.container');

    $('.container').append((createCard).append(createFront,createBack)); // where the divs with the front and back images --***are added***--> to the div that has the class 'card' --***is added***--> to the div with a class of 'container'
  }
}

function removeClickHandler (){ //turns off the function handleCardClick when a click is made on the card (*** used to fix the spamming issue caused within the timeout time **** )
    $(".card").off("click", handleCardClick)
}

function addClickHandler () { //turns back on the function handleCardClick so you can click on other cards
    $(".card").on("click", handleCardClick)
}

function handleCardClick(event) { //the function that handles multiple conditions when the user clicks on images
  // if ($(event.currentTarget).find('.back').hasClass('hidden')) { //don't need this. solved the problem of spamming above^
  //   return;
  // }

  $(event.currentTarget).find('.back').addClass('hidden'); //when the user clicks on a card with a class of 'back', hide the back of the card so the front can be revealed.


  if (firstCardClicked) { //a conditional that checks if the first is null or "empty"
      firstCardClicked = $(event.currentTarget); //assign that specific 'first click' to the global variable firstCardClicked (firstCardClicked is no longer null)
  } else { //if firstCardClicked is not null
      secondCardClicked = $(event.currentTarget); //assign that specific 'second click' to the global variable secondCardClicked (secondCardClicked is no longer null)
      var firstChoice = $(firstCardClicked).find('.front').css('background-image'); // where the 'first click' is now assigned with it's background img (assinged in the CSS) --> stored into a variable 'firstChoice'
      var secondChoice = $(secondCardClicked).find('.front').css('background-image');// where the 'second click' is now assigned with it's background img(assinged in the CSS) --> stored into a variable 'secondChoice'
      removeClickHandler(); //after the first and second card is clicked, this function is executed to prevent a 3rd click to occur

    if (firstChoice === secondChoice) { //a conditional that checks if the first and second clicks' images are the same
        matches++; //if they are the same, increment current value in matches by 1
        attempts++; //increment current value in attempts by 1
        console.log('The cards do match! :)'); //
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
        console.log('this happened');
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





/* ----------- Pseudocode ------------- */
//1. array to store classes of the images
    //test with 2 cards

//2. while (cardDeck.length>0),
//var createCard = $('<div>').addClass('card')
//var createFront = $('<div>').addClass('front')
//var createBack = $('<div>').addClass('back')
//var randomIndex = Math.random/floor( > cardDeck.length)
//

// var b = cardDeck.splice(randomIndex,1)
// var = createFront.addClass(var b)

//append variables that have() back + front ) to it's parent (card) --->  its parent ('.container')

//cardDeck++;



//need to make .front and .back css


//ToDo List
//1. make cards reshuffle when you click remove class
