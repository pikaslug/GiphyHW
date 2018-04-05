$(document).ready(function () {

    var buttons = ["horse", "cat", "dog", "bird"];

    function displayGif() {
        
        var animal = $(this).attr("data-name");
        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=BkyL7ubpXRVXVYZmCjZ4oRbPIWzpkx60&limit=10&q=${animal}`;
    
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log(response);

            $("#display").empty();

            for (var i = 0; i < 10; i++) {
                $("#display").append("<img class='imgClick' src='"+response.data[i].images.fixed_height_still.url+"' data-animate='"+response.data[i].images.fixed_height.url+"' data-still='"+response.data[i].images.fixed_height_still.url+"' data-state='still'>");
            }

            $(".imgClick").on("click", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");   
                } else if (state === "animate") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");   
                }
            });

        });
    };

    function renderButtons() {
        
        $("#buttons").empty();
        for (var i = 0; i < buttons.length; i++) {
            var a = $("<button>");
            a.addClass("category");
            a.attr("data-name", buttons[i]);
            a.text(buttons[i]);
            $("#buttons").append(a);
        };
    };

    $("#addButton").on("click", function(){
        event.preventDefault();
        
        var category = $("#addCategory").val().trim();
    
        buttons.push(category);
    
        renderButtons();
    });

    $(document).on("click", ".category", displayGif);

    renderButtons();
});
