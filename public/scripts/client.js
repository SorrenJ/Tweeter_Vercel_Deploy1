$(document).ready(function() {
  const $tweetContainer = $('#tweet-container');

  const renderTweets = function(tweets) {
    // Loops through tweets and appends each one to the tweet container
    // Clear only the container if it's the initial load or if new data was posted
    $tweetContainer.empty();
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet);
      $tweetContainer.append(newTweet);
    }
  };

  // prevents xss injection
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <img src="${tweet.user.avatars}" alt="${tweet.user.name}" width="64">
          <h3>${tweet.user.name} <span class="username">${tweet.user.handle}</span></h3>
        </header>
        <div class="content">
          ${escape(tweet.content.text)}
        </div>
        <footer>
          <div class="date">${timeago.format(tweet.created_at)}</div>
          <div class="date">${new Date(tweet.created_at).toLocaleString()}</div>
          <div class="actions">
            <span><i class="fa-solid fa-flag"></i></span>
            <span><i class="fa-solid fa-retweet"></i></span>
            <span><i class="fa-solid fa-heart"></i></span>
          </div>
        </footer>
      </article>
      <br>
    `);

    return $tweet;
  };

  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    })
      .then((data) => {
    
        // recent tweets are on top
        renderTweets(data.reverse());

      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  loadTweets();
$('.error').hide();

  const $tweetForm = $('#tweet-form');

  $tweetForm.submit(function(event) {
    
 console.log($("#tweet-text").val().length);

    
    
    
    event.preventDefault();
    let setLimit = 140;

    
    if ($("#tweet-text").val().length === 0){ // user inputs 0 chars

  $('.error').slideUp(); // slide up in case you have an error message already
  return $("#empty").slideDown(); // the new error message
   }

    if ([...$("#tweet-text").val()].every(char => char === ' ')){ //converts the string to indiv chars and checks if every char is a space
 
    $('.error').slideUp(); // slide up in case you have an error message already
    return $("#empty").slideDown();
         
      }
   
   if ($("#tweet-text").val().length > setLimit){ // user inputs over set char limit
    $('.error').slideUp(); // slide up in case you have an error message already
    return $("#overLim").slideDown();
       
    }
   
    // if statement prevents the user from going to tweet route if the conditions are not met
   if ($("#tweet-text").val().length > 0 && $("#tweet-text").val().length <= setLimit ){

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    })
      .then(() => {
        $('#tweet-text').val(''); // clears text area after a sucessful post
        $('#char-counter').text(140); // Resets counter when post
        loadTweets(); // Load tweets again to get the new one
       
        $('.error').slideUp();
        $("#tweet-text").val().length = 0;
      })
      .catch((error) => {
        console.log("error: ", error);
       
      });
    }
   
  });

  // hide new tweet from the start
  $('#compose-tweet-selector').hide();

  // press nav arrow button to compose a new tweet, scrolls up too
  $('#arrow-button-selector').click(function() {
      $('#compose-tweet-selector').slideToggle('fast');
      $('html, body').animate({scrollTop: 0}, 'fast');
  });

   // 2nd arrow button displays only when user scrolls
  $( "#scrollTop" ).css( "display", "none" );
  $( window ).on( "scroll", function() {
    $( "#scrollTop" ).css( "display", "inline" );
if ($('html, body').scrollTop() === 0){
  $( "#scrollTop" ).css( "display", "none" );
}

  } );

     // 2nd arrow button functionality to scroll up and reveal compose
  $("#scrollTop").click(function() {
    $('html, body').animate({scrollTop: 0}, 'fast');
    $('#compose-tweet-selector').slideToggle('fast');
});



});// end of whole ducument
