

$(document).ready(function () {
    var topics = ["Mecha", "Gundam", "Voltron", "Mecha Godzilla", "Knights of Sidonia", "Aldnoah Zero", "Pacific Rim",
     "Mazinger Z", "Macross", "Gundam ZZ", "Full Metal Panic"];
    function displayTopicGif() {
        $("button").on("click",  function () {
        
            var topic = $(this).attr("data-topic");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                topic + "&api_key=0s3GhZ60yFQgSvoDZ5rfXYPJB3urUXBN&limit=10&offset=0&rating=G&lang=en";
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    console.log(queryURL);
                    console.log(response);
                    var results = response.data;
                    for (var i = 0; i < results.length; i++) {
                        var topicDiv = $("<div>");
                        var p = $("<p>").html("Rating: " + results[i].rating + "<br>");
                        var topicImage = $("<img>");
                        topicImage.attr({
                            "src": results[i].images.fixed_height_still.url,
                            "data-still": results[i].images.fixed_height_still.url,
                            "data-animate": results[i].images.fixed_height.url,
                            "data-state": 'still',
                            "class": 'gif'
                        });
                      
                        topicDiv.append(topicImage);
                        topicDiv.prepend(p);
                        $("#gifs-appear-here").prepend(topicDiv);
                    }
                    pauseGifs();
                });
        });
    }

    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("topic-btn btn btn-primary");
            a.attr({
                "data-topic": topics[i],
                "type": "submit"
            });
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }
        displayTopicGif();
    }

    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
      renderButtons();
    });

    $(document).on("click", ".animal-btn", displayTopicGif);
    renderButtons();
   
    function pauseGifs(){
        
    $("img").on("click", function () {
        event.preventDefault();
        var state = $(this).attr("data-state");
        console.log(state);
        console.log(this);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    }
    
});

