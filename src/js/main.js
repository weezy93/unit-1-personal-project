// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
});

  $('form').on("submit", function(event){
  	event.preventDefault();
  	$("#results").empty();
  var city = $('#city').val();
	var state = $('#state').val();
	var miles = $('#miles').val();
  	getEvents(city, state, miles);
  });


function getEvents(city, state, miles) {

	var url = "https://api.bandsintown.com/events/search.json?app_id=WHATS_UP_DENVER&location="+city+","+state+"&radius="+miles;
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "dataType": "jsonp",
	  "url": url,
	  "method": "GET",
	}

	$.ajax(settings).done(function(response) {
			return response.filter(function(value){
				return value;

		}).forEach(function(val){
			$('#results').append('<li>'+'Date: ', val.datetime, 'Artist: ', val.artists[0].name+'</li>');
			// console.log('Date:', val.datetime, 'Artist:', val.artists[0].name);
		});
	});
}





// function addToFavorites (){

// }


// keyword search
// filter after searching based on category
// filter by price
// add to their favorite's section

//make categories static
// when clicked, their id will link to a new search





//var url = 'http://api.bandsintown.com/events/search.json?app_id=WHATS_UP_DENVER&location=Denver,CO&radius=10'



 // general url ='https://www.eventbriteapi.com/v3/categories/103/?token=YGUB3C37CXPEQAMTUJ4C'



// function getEvents(keyword){
// var url = 'https://www.eventbriteapi.com/v3/categories/?token=YGUB3C37CXPEQAMTUJ4C';

// 	$.get(url).success(function(response){
// 		console.log(response);
// 			response.categories.forEach(function(value){
// 					console.log(value.name);
// 					$("#results").append('<li data-id="'+value.id+'"><a href="#">'+value.name+'</a></li>');
// 		});
// 	});
// }

// function getEvents(){
// 	var url = 'https://www.eventbriteapi.com/v3/categories/103/?token=YGUB3C37CXPEQAMTUJ4C';
// 	$.get(url).success(function(response){
// 				console.log(response);
// 			response.subcategories.forEach(function(value){
// 				$("#results").append('<li data-id="'+value.name+'"><a href="#">'+value.name+'</a></li>');
// 			});
// 		});
// 	}




