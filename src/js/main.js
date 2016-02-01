// add scripts
$(document).on('ready', function() {
  console.log('sanity check!');
});

//event handlers

  $('#citySearch').on("submit", function(event){
  	event.preventDefault();
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

// event delegation for maps api, for lat and long
$(".table").on("click", 'td', function(event){
	event.preventDefault();
	console.log( $(this).text());
});


//city search function
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
			$("#cityResults tr").text("");
			return response.filter(function(value){
				return value;

		}).forEach(function(val){
			var dateTime = val.datetime;
			var x = dateTime.split('-');
			var date = x[1] +' '+ x[2].split('T')[0]+' '+x[0];

			var musician = val.artists[0].name;
			var venue =	val.venue.name;
			var ticketUrl = val.ticket_url;
			$('#cityResults').append('<tr><td>'+date+'</td><td>'+musician+'</td><td>'+venue+'</td><td><a href='+ticketUrl+' target="_blank"><button>Get Tickets</button></a></td></tr>');
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
		console.log(response);
		$("#artistResults").append('<li>' +response.name+ '<br><img src=' +response.thumb_url+ '></li>');
		});
}




// set map to start

// var map = $("#map");

var latitude = 39.7392;
var longitude = -104.9903;
var center = {lat: latitude, lng: longitude};
function initMap(center){
	map = new google.maps.Map($("#map"), {
    center: center,
    zoom: 8
  });
}




// 	search venue location
//  have an empty lat and long variable,
// click on the venue - needs event delegation





