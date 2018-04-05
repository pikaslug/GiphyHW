$(document).ready(function () {

    var buttons = ["birds", "cats", "dogs", "horses"];

    function displayGif() {
        
        var emotion = $(this).attr("data-name");
        var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=CfBOtzc6eRlOGjIlK5Gi8ZUcpCGFATah&limit=10&q=${animals}';
    
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