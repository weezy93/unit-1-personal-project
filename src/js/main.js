// add scripts
$(document).on('ready', function() {
  console.log('sanity check!');
});

  $('#citySearch').on("submit", function(event){
  	event.preventDefault();
  	$('#cityResults').empty();
  var city = $('#city').val();
	var state = $('#state').val();
	var miles = $('#miles').val();
  getEvents(city, state, miles);
});

$('#artistSearch').on("submit", function(event){
	event.preventDefault();
	$('#artistResults').empty();
		var artist = $('#artist').val();
		searchArtist(artist);
});



// search by city

function getEvents(city, state, miles) {
	var url = "https://api.bandsintown.com/events/search.json?api_version=2.0&app_id=WHATS_UP&location="+city+","+state+"&radius="+miles;

var settings = {
	  "async": true,
	  "crossDomain": true,
	  "dataType": "jsonp",
	  "url": url,
	  "method": "GET",
	};

	$.ajax(settings).done(function(response) {
		console.log(response);
			return response.filter(function(value){
				return value;
		}).forEach(function(val){
			console.log(val);
			$('#cityResults').append('<li data-id="'+val.artists[0].name+'">'+'Date: ', val.datetime, ' Artist: ', val.artists[0].name+'</li>');
		});
	});
}

// search by artist

function searchArtist(artist){
	var url = "http://api.bandsintown.com/artists/"+artist+".json?api_version=2.0&app_id=WHATS_UP"

	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "dataType": "jsonp",
	  "url": url,
	  "method": "GET",
	};

	$.ajax(settings).done(function(response){
		$("#artistResults").append('<li>' +response.name+ '<br><img src=' +response.thumb_url+ '></li>');
		});
};






// keyword search
// filter after searching based on category
// filter by price
// add to their favorite's section

//make categories static
// when clicked, their id will link to a new search

// function getEvents(){
// 	var url = 'https://www.eventbriteapi.com/v3/categories/103/?token=YGUB3C37CXPEQAMTUJ4C';
// 	$.get(url).success(function(response){
// 				console.log(response);
// 			response.subcategories.forEach(function(value){
// 				$("#results").append('<li data-id="'+value.name+'"><a href="#">'+value.name+'</a></li>');
// 			});
// 		});
// 	}




