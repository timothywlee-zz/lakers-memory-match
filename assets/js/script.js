$(document).ready(initializeApp);

function initializeApp () {
 $('.card').on('click',handleCardClick);
}

function handleCardClick (event) {
      $(event.currentTarget).find('.back').addClass('hidden');
}
