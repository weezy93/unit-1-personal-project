// add scripts
$(document).on('ready', function() {
  console.log('sanity check!');
});

// event delegation for maps api, for lat and long

  $('#citySearch').on("submit", function(event){
  	event.preventDefault();
  	$('<table>').empty();

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

// show both date and artist, click on this to bring more information about the event
// link to search the map for the venue using the lat and long
// <td><button>Get Tickets</button></td>

	$.ajax(settings).done(function(response) {
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
// data-id="'+val.artists[0].name+'"   - id for li append

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
};





var map = $("#map");
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
// 	search venue location
//  have an empty lat and long variable,
// click on the venue - needs event delegation





