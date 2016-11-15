// =====================================================
// Variables
// =====================================================
var memes = ["steal yo girl", "feels", "forever alone", "come at me bro", "surprised patrick", "like a boss", "let me love you", "nyan cat"];

// =====================================================
// Functions
// =====================================================
//populate buttons
function renderButtons() {
	$("#topicSection").empty();
	for (var i = 0; i < memes.length; i++) {
	var btn = $("<button>");
	btn.addClass("meme btn btn-danger").attr("data-name", memes[i]).text(memes[i]);
	$("#topicSection").append(btn);
	}
}



// =====================================================
// Main Process
// =====================================================
//page loads 10 gifs based on button clicked
$(document).ready(function() {

	$(document).on("click", ".meme", function() {

		$("#images").empty();

	var search = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({url: queryURL, method: "GET"})
	.done(function(response) {
		var results = response.data;
		console.log(results);
		console.log(results.length);

		for (var i = 0; i < results.length; i++) {
		
		var gifDiv = $("<div>");
		gifDiv.addClass("fitted");

		var p = $("<p>");
		p.text("Rating: " + results[i].rating);

		var memeGif = $('<img>');
        memeGif.attr("src", results[i].images.fixed_height_still.url).addClass("gif");
        memeGif.attr({"data-animate": results[i].images.fixed_height.url, "data-still": results[i].images.fixed_height_still.url, "data-state": "still"});

        gifDiv.append(p);
        gifDiv.append(memeGif);
        $("#images").prepend(gifDiv);
		}
	});
});

//generate new button
$("#go").on("click", function(e) {
	e.preventDefault();
	var meme = $("#memeHolder").val().trim();
	memes.push(meme);
	renderButtons();
	return false;
});

//play/pause gif
$(document).on("click", ".gif", function() {
	var state = $(this).attr("data-state");
	// difference between data.("state") and attr.("data-state")??
	if (state == "still") {
		$(this).attr("src", $(this).data("animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).data("still"));
		$(this).attr("data-state", "still");
	}
});

renderButtons();

});

