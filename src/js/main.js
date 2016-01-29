// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');

  $('form').on("submit", function(event){
  	event.preventDefault();
  	$("#results").empty();
  	var keyword = $("#search").val();
  	getEvents(keyword);
  })
});


// keyword search
// filter after searching based on category
// filter by price
// add to their favorite's section

//make categories static
// when clicked, their id will link to a new search



function getEvents(keyword){

var url = 'https://www.eventbriteapi.com/v3/categories/?token=YGUB3C37CXPEQAMTUJ4C';

	$.get(url).success(function(response){
		console.log(response);
			response.categories.forEach(function(value){
					console.log(value.name);
					$("#results").append('<li data-id="'+value.id+'"><a href="#">'+value.name+'</a></li>');
		});
	});
}

