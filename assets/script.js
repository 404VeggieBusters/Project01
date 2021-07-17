console.log("hi");
// variable for cities
var cityLocation = document.getElementById("cityLocation");

// variable for search
var searchButton = document.getElementById("searchButton");

// variable for search results 
// 
var corsAnywhere = "https://cors-anywhere-bc.herokuapp.com/"
// variable for ALL the API keys that we use
// Recipe API
var suggesticAPI = "b3c04215f109c6bfb89a65bf7fa97bca24f3a1be";
// Location API
var xyzGeocodeAPI = "575609437300452386840x18086";
// yelp Api
var yelpAPI = "2QBglnFCVDpjaktvp3S9GFKkMJ52FQnfvEiaUVitSMYpgAKJzA56FMTp8F1RZElq6X1iDSW4wZonXGeSONZJQHzSLk3TT31LrJ_hzgCT9ZOykvEChChAD8rV6CPzYHYx";



// create function called getCity to grab local restaurants in city that is searched (below)


function getCity(event) {
    //event.preventDefault();
    //create variable of city we're searching 
    var citySearch = cityLocation.value;
    //consult api about city's plant based restaurants 
    getCoordinates(citySearch);

   
};

// AJAX call requires a third party library, jQuery
// $.ajax({
//     url: requestUrl,
//     method: 'GET',
//   }).then(function (response) {
//     console.log('Ajax Reponse \n-------------');
//     console.log(response);
//   });


// city parameter tells function you're going to get data passed through

function getCoordinates(city) {
    // var cityLocation = document.getElementById("cityLocation");
    // console.log(cityLocation.value)
    console.log(city);

    // fetch geoCode API
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=${city}&accept-language=en&polygon_threshold=0.0`,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "814c852a12mshd10ec0b749a3713p10cd5cjsn86539bb5f44e",
            "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com"
        }
    };

   

    $.ajax(settings)
    .then(function (response) {
        console.log(response);
        var coordinates = response[0];
        getFood(coordinates);
    });
};

function displayRestaurants(restaurants) {
    for (let i = 0; i < restaurants.length; i++)
        {
            let restDiv = $("<div>").text(restaurants[i].name)
            $("#restaurants").append(restDiv)
        }

}

function getFood(coordinates) {
    console.log(coordinates);
     //will take the users input and find restaraunts through yelp API
    // fetch yelpAPI 
    // fetch("https://api.yelp.com/v3")
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {

    //     })

    $.ajax({
        url: `${corsAnywhere}https://api.yelp.com/v3/businesses/search?latitude=${coordinates.lat}&longitude=${coordinates.lon}&categories=vegan&limit=50`,
        method: "GET",
        headers: {
            Authorization: "Bearer " + yelpAPI
        }
    })
    .then(function(response){
        console.log(response)
        // display results
        if (response.businesses.length) {
            
            displayRestaurants(response.businesses);
            
        }
    })
    // .catch(function (error) {
    //     alert('Unable to connect to GitHub');
    // });
};

//  Expamle for displaying results. Delete when finished
// fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//           displayRepos(data, user);
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert('Unable to connect to GitHub');
//     });
// };


// create function to get coordinates of location/places around it 

// create function to display search results 

// use parse to get data from websites to get only what we need (lesson 6 - activity 7)

// look at lesson 6 - activity 23

// make sure to set parameters in function, whether it's an event, response, etc. 

// hover effect on images of recipes / search results



// can create multiple functions and create p tags and apphend tags 


// create local storage for different pages to be stored

// display some of data from user input 


// add event listener for search button
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(cityLocation.value);
    getCity();
});

// add event listener for once search button is pressed nearby locations html page pops upto display data
// searchButton.addEventListener("click", function(event) {
//     document.location.href = 'nearbylocations.html';
//     console.log()
// })

// add event listener for moving from one webpage to another
// add event listener clicking on images and recipes

// give header an animation and add some audio to the page? (last thing to do)
