$(document).ready(function() {
  // --- our code goes here ---
  
  $("#tweet-text").on('keyup', function(event) {
      
    let charCount = $(this).val().length;
    let setLimit = 140;
    let charCounter = setLimit - charCount;

    // alert(`user wrote ${charCount} characters`);
    // Update the character count display
    
    $('#char-counter').text(charCounter);

    if (charCounter < 0) {
      $('#char-counter').css("color", "red");
    } else {
      $('#char-counter').css("color", "#484848");
    }
 
    


  

  });








});