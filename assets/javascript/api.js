var heroArray = ["Deadpool", "Wonder Women", "Teen Titans"];

function createButton() {
    $("#buttonDiv").empty();
    for (var i = 0; i < heroArray.length; i++) {
        var b = $("<button>");
        b.addClass("hero");
        b.attr("data-hero", heroArray[i]);
        b.text(heroArray[i]);
        $("#buttonDiv").append(b);
    }
}

$("#add-hero").on("click", function (event) {
    event.preventDefault();

    var comicHero = $("#hero-input").val().trim();

    console.log($("#hero-input"));

    console.log("comicHero:", comicHero);
    heroArray.push(comicHero);

    createButton();
});


$("#buttonDiv").on("click", ".hero", function () {

    $("#gifsHere").empty();
    
    var hero = $(this).attr("data-hero");
    console.log("hero", hero);

    var queryURL = "https://api.giphy.com/v1/gifs/search";

    $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                q: hero,
                api_key: "as07ocyHLhgtJMJLVTVYPeip4y0aYMej",
                limit: 10
            }
        })

        .done(function (response) {

            var results = response.data;




            for (var i = 0, sol = results.length; i < sol; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var resDiv = $("<div>").addClass("item");
                    resDiv.addClass("col-xs-4");
                    var rating = results[i].rating;

                    var paraRating = $("<p>").text("Rating: " + rating);
                    paraRating.addClass("color");
                    var heroImage = $("<img>");

                    heroImage.attr("data-state", "still");

                    heroImage.attr("src", results[i].images.fixed_height_still.url);
                    heroImage.attr("data-still", results[i].images.fixed_height_still.url);
                    heroImage.attr("data-animate", results[i].images.fixed_height.url);



                    resDiv.append(paraRating);
                    resDiv.append(heroImage);

                    $("#gifsHere").prepend(resDiv);
                }
            }

            $("img").on("click", function () {

                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");

                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
});

createButton();