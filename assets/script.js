// variable for cities
var cityLocation = document.getElementById("cityLocation");
// variable for search
var searchButton = document.getElementById("searchButton");
var nearbyButton = document.getElementById("nearbyButton");

// I Like This Button
var likeThisButton = localStorage.getItem("I Like This");
console.log("button like this");

// variable for local storage 
// var favRestaurantsIndex = document.getElement...
// bring json into storage (bringing back json= google)!!

// variable for cors
var corsAnywhere = "https://cors-anywhere-bc.herokuapp.com/"
// variable for ALL the API keys that we use
// Recipe API
var suggesticAPI = "b3c04215f109c6bfb89a65bf7fa97bca24f3a1be";
// Location API
var xyzGeocodeAPI = "575609437300452386840x18086";
// yelp Api
var yelpAPI = "2QBglnFCVDpjaktvp3S9GFKkMJ52FQnfvEiaUVitSMYpgAKJzA56FMTp8F1RZElq6X1iDSW4wZonXGeSONZJQHzSLk3TT31LrJ_hzgCT9ZOykvEChChAD8rV6CPzYHYx";


$(document).ready(function(){
    var modal = $('.modal').modal();
});


// create function called getCity to grab local restaurants in city that is searched (below)
function getCity(event) {
    event.preventDefault();
    //create variable of city we're searching 
    var citySearch = cityLocation.value;
    //consult api about city's plant based restaurants 
    getCoordinates(citySearch);
};
// city parameter tells function you're going to get data passed through
function getCoordinates(city) {

    // Get users location
    // fetch geoCode API
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=${city}&accept-language=en&polygon_threshold=0.0`,
        method: "GET",
        headers: {
            "x-rapidapi-key": "814c852a12mshd10ec0b749a3713p10cd5cjsn86539bb5f44e",
            "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com"
        }
    };

  

    $.ajax(settings)
        .then(function (response) {
            //console.log(response);
            var coordinates = response[0];
            getFood(coordinates);
        });
};

function displayRestaurants(restaurants, coordinates) {
    $("#restaurants").html("");
    console.log(restaurants);

    if (restaurants.length === 0){
        $('.modal').modal('open');
        return;
    }

    for (let i = 0; i < restaurants.length; i++) {
        let restDiv = $("<div>").text(restaurants[i].name)
        let restAddrsDiv = $("<div>").text(restaurants[i]["location"]["display_address"])
        let restPhoneDiv = $("<div>").text(restaurants[i]["display_phone"])
        let restURLlink = document.createElement('a');
        restURLlink.setAttribute('href', restaurants[i]["url"]);
        restURLlink.innerHTML = "Click to view yelp page";
        restURLlink.target = '_blank';
        let noRestaraunt = document.createElement('h3');
        noRestaraunt.innerHTML = "No restarants near you";
        // adding like button to restaurant cards 
        var likeThisButton = document.createElement("button");



        let row = `
            <div class="row">
                <div class="card">
                    <div class="col offset-s3 s4">
                    <h4><a href="${restaurants[i]["url"]}" target="_blank"> ${restaurants[i].name}</a></h4>
                    <p id="${restaurants[i].id}"></p>
                    <p>${restaurants[i]["location"]["display_address"]}</p>
                    <p>${restaurants[i]["display_phone"]} </p>
                    </div>
                    <div class="col s2">
                    <img src="${restaurants[i].image_url}">
                // favorite restaurant button
                    <button id="${restaurants[i]}">I Like This!</button> 
                </div>
            </div>
            `;
        $("#restaurants").append(row);
        getDistanceToRestaurant(restaurants[i], coordinates)


        if (restaurants[i] === 0) {
           
        }
    }
}

function getDistanceToRestaurant(restaurant, coordinates) {
// do geolocation on restaurant.location
$.ajax(restaurant.location.geolocation)
// .then()...do  the haversine calculation
    .then(function (haversine) {
                for(let i = 0; i < restaurants.length; i++){
                    $("#" + restaurant.id).text('is ' + haversine.restaurants[i] + ' miles away')
                }
    })
  

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
        .then(function (response) {
            console.log(response)
            // display results
            if (response.businesses.length) {

                displayRestaurants(response.businesses, coordinates);
            }
        })
    // .catch(function (error) {
    //     alert('Unable to connect to GitHub');
    // });
};

// Jess' Tasks for Wednesday
// add event listener to each I Like This Button - 1

// set it as local storage in fav restaurants -2 
// localStorage.setItem("") -3 (set a key- fav rest. and push name into key you created in local storage)
// check local storage of names of restaurants / turn color of button -4
// can only save data from string to array (json.parse) -5

// create function to get coordinates of location/places around it 
// create local storage for 

// use parse to get data from websites to get only what we need (lesson 6 - activity 7)

// look at lesson 6 - activity 23



// can create multiple functions and create p tags and apphend tags 

// create local storage for different pages to be stored


// display some of data from user input 


// add event listener for search button
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
    
});


nearbyButton.addEventListener("click", function (event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCurrentLocation); // from W3
});

function getCurrentLocation(position) {
    let coord = {
        "lat": position.coords.latitude,
        "lon": position.coords.longitude
    }
    getFood(coord);
}
