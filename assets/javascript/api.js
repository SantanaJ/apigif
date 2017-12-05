$("buttons").on("click", function(){
   var hero= $(this).attr("data-hero");

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

        .done(function (response){
            
            var results= response.data;

            for (var i=0, sol = results.length; i < sol; i++){

            if (results[i].rating !== "r" && results[i].rating !== "pg-13"){

                var resDiv= $("<div>").addClass("item");

                var rating= results[i].rating;

                var paraRating= $("<p>").text("Rating: " + rating);

                var heroImage = $("<img>");

                heroImage.attr("src", results[i].images.fixed_height.url);

                resDiv.append(paraRating);
                resDiv.append(heroImage);

                $("#gifsHere").prepend(resDiv);
            }
        }
    });
   
});
