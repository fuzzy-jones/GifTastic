// https://api.giphy.com/v1/gifs/search?api_key=xFHtqYPE42jbIneYyI0aPoygDEg0EZwA&q=game+of+thrones&limit=10&offset=0&rating=PG&lang=en

// https://api.giphy.com/v1/gifs/search?api_key=xFHtqYPE42jbIneYyI0aPoygDEg0EZwA&q=&limit=25&offset=0&rating=PG&lang=en


var characters = ["Jon Snow", "The Mountain", "Tyrion Lannister", "Bran Stark", "Cersei Lannister", "Ice King", "Hodor", "Arya Stark", "Melisandre"]

function displayCharacterInfo() {
    
    var characters = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + characters + "xFHtqYPE42jbIneYyI0aPoygDEg0EZwA&q=&limit=25&offset=0&rating=PG&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {

        console.log(response); 

      });
}

function renderButtons() {

    $("#button-view").empty();

    for (var i = 0; i < characters.length; i++) {
        $("#button-view").append("<button>" + characters[i] + "</button>");
    }
}

renderButtons();