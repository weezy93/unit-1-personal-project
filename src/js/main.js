// add scripts
var map;

$(document).on('ready', function() {
  console.log('sanity check!');
  mapInitialize();
  backgroundPictures(images);
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


// ---------------------------------------- function declarations



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
				var LatLng = {
					lat: response[0].venue.latitude,
					lng: response[0].venue.longitude
				}
			map.setCenter(LatLng);

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

			// adding venue markers to map

			var contentString = '<div id="content" class="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading content">'+"•"+venue+"•"+'</h1>'+
      '<div id="bodyContent">'+
      date+ " • " +musician+
      '</div>'+
      '</div>';


			var myLatLng = {lat: val.venue.latitude, lng: val.venue.longitude};
			var marker = new google.maps.Marker({
		    position: myLatLng,
		    map: map,
		    clickable: true
		  });

		  marker.info = new google.maps.InfoWindow({
				content: contentString
			});

			google.maps.event.addListener(marker, "click", function(){
				marker.info.open(map, marker);
			});
		});
	});
}


// map bullshit


function mapInitialize() {
	var mapProp = {
    center: new google.maps.LatLng(39.7392, -104.9903),
    zoom: 12,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

var images = ["images/chicago.jpg", "images/sf.jpg", "images/denver.jpg", "images/portland.jpg", "images/nyc.jpg","images/austin.jpg","images/seattle.jpg"];

function backgroundPictures(images){
	var counter = 0;
	$('body').css('background-image', 'url('+images[counter]+')', 'transition', 'all 1s');
	var loop = setInterval(function(){
		$("body").css("background-image", 'url('+images[counter]+')');
			counter++;
			if(counter === images.length){
				counter = 0;
			}
	}, 7000 );
}




/* NEED TO FIX
- artist search function to search artist events
- background url fit page

*/





