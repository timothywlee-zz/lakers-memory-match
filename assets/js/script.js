$(document).ready(initializeApp); //DOM manipulation where the function 'initializeapp' is passed into the document object where it is passed into the ready() method that executes all jquery and javascript code.

var firstCardClicked = null; //when there is no current value for the first click
var secondCardClicked = null; //when there is no current value for the second click
var matches = 0; //the total number of card pairs that were matched
var max_matches = 1; //the max number of card pairs that can be matched for the game to end
var attempts = 0; //the current number of attempts to match a pair in a single game (attempts+=1 after two clicks)
var games_played = 0; //the total number of games played (games_played+=1 after win per game)


function initializeApp () { //the function handler that executes all the other functions immediately after the document is loaded.
    $('.modalContainer').addClass("hidden"); //hides the modal Container immediately when document is executed so the user won't see it at first until it is called back
    randomizeCards(); //executes the randomizeCards function
    $('.card').on('click',handleCardClick); //when a card is clicked, it would run the function 'handleCardClick'
    $('.restartClick').on('click',resetStats); //allows the user to click 'play again' which runs the function 'resetStats' that restarts the game
}

function randomizeCards() { //the function that executes code to shuffle the cards randomly
  $('.card').remove(); //removes the cards if there are any present <-- used to remove the cards when resetting the game


  var cardDeck = ['a-davis','a-davis','d-green','d-green','d-howard','d-howard','kcp','kcp','kuz','kuz',
                  'lebron','lebron','mcgee','mcgee','rondo','rondo','a-caruso','a-caruso']; //an array that holds the images

  while (cardDeck.length > 0) { // execute this while-loop only when the cardDeck has a current value that is greater than 0.
    var createCard = $('<div>').addClass('card'); // makes a div per card made
    var createFront = $('<div>').addClass('front'); //makes a div for the front of each card
    var createBack = $('<div>').addClass('back'); //makes a div for the back of each card

    var randomIndex = Math.floor(Math.random() * cardDeck.length); //random method used to randomize the images in the cardDeck array.

    var removeACardFromCardDeck = cardDeck.splice(randomIndex, 1); //removes one random card from the cardDeck array

    var addCardToFront = createFront.addClass(removeACardFromCardDeck); //where the single random card that was removed from the array --> added to the div with the class of front.

    // createFront.appendTo(createCard);
    // createBack.appendTo(createCard);
    // createCard.appendTo('.container');

    $('.container').append((createCard).append(createFront, createBack)); // where the divs with the front and back images --***are added***--> to the div that has the class 'card' --***is added***--> to the div with a class of 'container'
  }
}

function removeClickHandler (){ //turns off the function handleCardClick when a click is made on the card (*** used to fix the spamming issue caused within the timeout time **** )
    $('.card').off('click', handleCardClick)
}

function addClickHandler () { //turns back on the function handleCardClick so you can click on other cards
    $('.card').on('click', handleCardClick)
}

function handleCardClick(event) { //the function that handles multiple conditions when the user clicks on images
  if ($(event.currentTarget).find('.back').hasClass('hidden')) { //prevents clicking on the same image 4 times --> resulting in a win
    return;
  }

  $(event.currentTarget).find('.back').addClass('hidden'); //when the user clicks on a card with a class of 'back', hide the back of the card so the front can be revealed.


  if (firstCardClicked === null) { //a conditional that checks if the first is null or "empty"
      firstCardClicked = $(event.currentTarget); //assign that specific 'first click' to the global variable firstCardClicked (firstCardClicked is no longer null)
  } else { //if firstCardClicked is not null
      secondCardClicked = $(event.currentTarget); //assign that specific 'second click' to the global variable secondCardClicked (secondCardClicked is no longer null)
      var firstChoice = $(firstCardClicked).find('.front').css('background-image'); // where the 'first click' is now assigned with it's background img (assinged in the CSS) --> stored into a variable 'firstChoice'
      var secondChoice = $(secondCardClicked).find('.front').css('background-image');// where the 'second click' is now assigned with it's background img(assinged in the CSS) --> stored into a variable 'secondChoice'
      removeClickHandler(); //after the first and second card is clicked, this function is executed to prevent a 3rd click to occur

    if (firstChoice === secondChoice) { //a conditional that checks if the first and second clicks' images are the same
        matches++; //if they are the same, increment current value in matches by 1
        attempts++; //increment current value in attempts by 1
        console.log('The cards do match! :)'); //personal check to see if this conditional was met
        firstCardClicked = null; //set the first and second click back to null('empty') because if you dont, when you choose a third card, the firstCardClicked will still be the 'card' you clicked previously.. its still being assigned to that one. so you gotta set it back to 'null'.
        secondCardClicked = null; // ^
        addClickHandler(); //allows the user to click another card to assign that new firstCardClicked = null --> firstCardClicked = (a certain card based off which the user clicks next (event.currentTarget))
        displayStats(); //updates the stats
    } else { // a conditional that says the first and second clicked cards don't have the same background images
        attempts++; //increments attempts + 1
        setTimeout(function () { //a method that takes in two arguments (an anonymous function and a timer (in milliseconds)) <-- used to turn the cards back if the two cards clicked don't match
            firstCardClicked.find('.back').removeClass('hidden'); //unhides the back of the card for the first card that was clicked
            secondCardClicked.find('.back').removeClass('hidden'); //unhides the back of the card for the second card that was clicked
            firstCardClicked = null; //set the cards back to null because if you dont, when you choose a third card, the firstCardClicked will still be the 'card' you clicked previously.. its still being assigned to that one. so you gotta set it back to 'null'.
            secondCardClicked = null; // ^
            addClickHandler();//allows the user to click another card to assign that new firstCardClicked = null --> firstCardClicked = (a certain card based off which the user clicks next (event.currentTarget))
            displayStats(); //updates stats
        }, 1000); //1000 milliseconds = 1 second
          console.log('The cards do not match :(') //personal check to see if this part of the conditional was executed to say that the cards don't match on the console
    }
  }
    if (matches === max_matches) { //a conditional that checks if the current value in the global variable 'matches' is exactly the same as the set value in the global variable max_matches (which is set to a specific number)
       $('.modalContainer').removeClass('hidden'); //unhides the modal container so the user can see it after the current game is finished
   }
}

function calculateAccuracy() { //runs a function that calculates the accuracy
    return (matches/attempts)*100 ; //multiply by 100 to get a whole number, not a decimal
}

function displayStats () { //runs a function that displays the current statistics. Updates the text to the new information.
    var accuracy = calculateAccuracy(); //the value that is returned in the function 'calculateAccuracy' is assigned to the variable 'accuracy'
    console.log('attempts: ', attempts); //personal check to see the current value in the global variable 'attempts'
    console.log('games played: ', games_played); //personal check to see the current value in the global variable 'games_played'
    $('.gamesPlayedNum').text(games_played); //targets the class 'gamesPlayedNum' in the html where it updates the text to the current value in the global variable 'games_played'
    $('.attemptsNum').text(attempts); //targets the class 'attemptsNum' in the html where it updates the text to the current value in the global variable 'attempts'
    $('.accuracyNum').text((Math.round(accuracy*10)/10) +'%'); //targets the class 'accuracyNum' in the html where it updates the text to the current value in the local variable 'accuracy' which has the current values of matches + attempts. Used a method (Math.round..) to round the number with one decimal.
}

function resetStats() { //runs a function that resets the game --> resets some of the global variables except games_played
    matches = 0; //reset the current value back to 0
    attempts = 0; //reset the current value back to 0
    games_played++; //don't need to reset this because you want to update the number of games played after each win (increment by 1)
    displayStats(); //after resetting the global variables, display the stats with the current values after they were reset
    console.log("gamesplayed count: ", games_played); //personal check to see what the current value in the global variable 'games_played' is at.
    if (attempts > 0) { //a conditional used to prevent the text in the div with the class of 'accuracyNum' displaying 'NaN%' when there is no current value in the global variable 'attempts'. It would return 'NaN' because if either attempts or matches had a value of 0, it would return NaN.
      return calculateAccuracy(); //if the current value in 'attempts' is greater than 0, than return the the current value in calculateAccuracy();
    } else { //if the current value in 'attempts' is not greater than 0
      $('.accuracyNum').text('0%'); //target the text in the class 'accuracyNum' and replace it will '0%'. <---- this fixes the issue with the text displayed 'NaN%' when attempts or matches is 0. (0/0 === NaN)
    }
      $('.modalContainer').addClass('hidden'); // after resetting the statistics, need to make the modal container reappear
      $('.card').find('.back').removeClass('hidden'); //targets the div with the class of 'card' and finds the class of 'back' and unhides the back.

    randomizeCards(); //executes the this function to randomize the cards again
    addClickHandler(); //turns back on the function handleCardClick so you can click on other cards
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
