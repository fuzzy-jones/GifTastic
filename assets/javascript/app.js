
// https://api.giphy.com/v1/gifs/search?api_key=xFHtqYPE42jbIneYyI0aPoygDEg0EZwA&q=&limit=10&offset=0&rating=G&lang=en


var characters = ["Jon Snow", "Tyrion Lannister", "Bran Stark", "Cersei Lannister", "Hodor", "Arya Stark"]


// displaying the buttons dynamically on the top of page 
function displayButtons() {
    
    // making sure the html with id button-view is empty before function is run
    $("#button-view").empty();

    // create a for loop to run through the characters array variable
    for (var i = 0; i < characters.length; i++) {
        // create a dynamic button and store it in the variable button
        var button = $("<button>");
        // add a class name of 'character' to that button
        button.addClass("character");
        // add an attribute of data-name to the button and assign the value of the characters names
        button.attr("data-name", characters[i]);
        // display the text of the characters on the button
        button.text(characters[i]);
        // this will append the stored value of the button variable into the html id #button-view
        $("#button-view").append(button);
    }
}

// run the function to display dynamic buttons from array on page load
displayButtons();


// onclick listener for the buttons
// when you click the button with class of 'character' it will run the function
$(document).on("click", ".character", displayCharacterInfo);


// on click event for input with id of add-character
$("#add-character").on("click", function(event) {
    event.preventDefault();
    // store the value of whatever the user types into add-character input and trim that value
    var character = $("#character-input").val().trim();
    // push that stored value of character variable into the characters array 
    characters.push(character);
    // this will clear the input field after add character button or enter key is pressed
    $("#character-input").val('');
    // run the function to display it as a new button along with existing buttons at top of page
    displayButtons();
});


// function which displays the targeted info from api into the html id
function displayCharacterInfo() {

    // create a variable of character and assign the attribute of data-name value to it
    var character = $(this).attr("data-name");
    // the api will search based on each individual name in the 'characters' array with the 'character' variable
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=xFHtqYPE42jbIneYyI0aPoygDEg0EZwA&lang=en&rating=pg-13";
    

    $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {

        console.log(response); 

        // creating a new div to store new class of character
        var characterDiv = $("<div id='character-gif'>");

        // creating a for loop to select the first 10 giphys of data returned from api
        for (i = 0; i < 10; i++) {

            // targeting the gif url in the object and storing it in a new variable
            var gifURL = response.data[i].images.fixed_height.url
            // creating an image div with the attribute source of the gifUrl variable and storing it in a new variable 
            var gif = $("<img>").attr("src", gifURL);
            // add a class of gif to the gif variable to make it clickable by class play/pause onclick function
            gif.addClass("gif");
            // add attributes of "data-still" to gif and the still image response of gif to use in play pause onclick
            gif.attr("data-still", response.data[i].images.fixed_height_still.url);
            // add attribute of "data-animate" to gif and the regular playing response from gifUrl to later reanimate the gif in play pause function
            gif.attr("data-animate", response.data[i].images.fixed_height.url);
            // gif the gif variable a "data-state" attribute of animate to so we can have it playing by default in play/pause function
            gif.attr("data-state", "animate");
            // appending the gif variable with a stored value of the url address in the character div variable 
            characterDiv.append(gif);

            // targeting the rating url in the object and storing it in a rating variable
            var rating = response.data[i].rating;
            // creating variable to store the html text and stored rating
            var rated = $("<p>").text("Rated: " + rating);
            // appending the value of var rated in the characterDiv variable that has a stored div class of 'character'
            characterDiv.append(rated);
        }

        // displaying the stored rating and url address from the characterDiv in the html with an id of giphy-view
        $("#giphy-space").html(characterDiv);

    });

    // pause and play gif
    $(document).on("click", ".gif", function() {
        // create a variable and storing the value of the attribute "data-state" in it
        var state = $(this).attr("data-state");
        // when the gif is clicked, if the data-state is equal to "animate" the gif will set the "data-still" stored url and pause, and change the "data-state" to "still"
        // else if the "data-state" is "still" which it was changed to when clicked, when it is clicked again it will return to "data-animate" and play gif, and set the "data-state" back to "animate"
        if (state === "animate") {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        } else {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
    });

}

