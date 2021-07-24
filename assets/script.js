// variable for cities
var cityLocation = document.getElementById("cityLocation");
// variable for search
var searchButton = document.getElementById("searchButton");
var nearbyButton = document.getElementById("nearbyButton");
var favoritesButton = document.getElementById("favoritesButton");
// variable for current list of restaurants
var restaurantList;
// variable for cors
var corsAnywhere = "https://cors-anywhere-bc.herokuapp.com/"

// variable for ALL the API keys that we use
// Recipe API
var suggesticAPI = "b3c04215f109c6bfb89a65bf7fa97bca24f3a1be";
// Location API
var xyzGeocodeAPI = "575609437300452386840x18086";
// yelp Api
var yelpAPI = "2QBglnFCVDpjaktvp3S9GFKkMJ52FQnfvEiaUVitSMYpgAKJzA56FMTp8F1RZElq6X1iDSW4wZonXGeSONZJQHzSLk3TT31LrJ_hzgCT9ZOykvEChChAD8rV6CPzYHYx";

var currentLocation = null;

$(document).ready(function () {
    var modal = $('.modal').modal();
});

function getMiles(i) {
    return i * 0.000621371192;
}

// create function called getCity to grab local restaurants in city that is searched (below)
function getCity(geolocation) {
    currentLocation = geolocation;
    //event.preventDefault();
    //create variable of city we're searching 
    var citySearch = cityLocation.value;
    //consult api about city's plant based restaurants 
    getCoordinates(citySearch);
};
// city parameter tells function you're going to get data passed through
function getCoordinates(city) {

    if (city === undefined) {
        $('.modal').modal('open');
        return;
    }

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
    restaurantList = restaurants;
    // A loop to go throught the array and find the restaurants name, address, phone number,
    for (let i = 0; i < restaurants.length; i++) {
        let distanceP = ``
        if (typeof coordinates != undefined && coordinates) {
            distanceP = `<p>${getDistanceToRestaurant(restaurants[i], coordinates)} miles</p>`
        }
        let row = `
            <div class="row">
                <div class="card">
                    <div class="col offset-s3 s4">
                    <h4><a href="${restaurants[i]["url"]}" target="_blank"> ${restaurants[i].name}</a></h4>` +
                    distanceP +
                    `<p id="${restaurants[i].id}"></p>
                    <p>${restaurants[i]["location"]["display_address"]}</p>
                    <p>${restaurants[i]["display_phone"]} </p>
                    </div>
                    <div class="col s2">
                    <img src="${restaurants[i].image_url}">
                    <button class="like-btn btn" style="line-height: 14px;" id="like${restaurants[i].id}">Add To Favorites</button> 
                </div>
            </div>
            `;
        $("#restaurants").append(row);
    }
}

// we call haversine function from the js file  and call these parameters -- ex: haversine (startCoordinates, endCoordinates, options)
function getDistanceToRestaurant(restaurant, coordinates) {
    let distance = haversine(
        // start coords from geolocation API call
        { "longitude": currentLocation.coords.longitude, "latitude": currentLocation.coords.latitude },
        // { "longitude": coordinates.lon, "latitude": coordinates.lat },
        // end coords from the Yelp API call 
        { "longitude": restaurant.coordinates.longitude, "latitude": restaurant.coordinates.latitude },
        // change from kilometers to miles 
        { unit: 'mile' }
    )
    return Math.round(distance);
}

function getFood(coordinates) {
    console.log(coordinates);
    //will take the users input and find restaraunts through yelp API
    $.ajax({
        url: `${corsAnywhere}https://api.yelp.com/v3/businesses/search?latitude=${coordinates.lat}&longitude=${coordinates.lon}&categories=vegan&limit=50`,
        method: "GET",
        headers: {
            Authorization: "Bearer " + yelpAPI
        }
    })
        .then(function (response) {
            // display results
            if (response.businesses.length) {
                displayRestaurants(response.businesses, coordinates);
            } else {
                $('.modal').modal('open');
            }
        })
    // hide spinner
    $("#spinner").addClass("hide");
};

// add event listener for search button
if (searchButton) {
    searchButton.addEventListener("click", function (event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(getCity);
        // unhide spinner
        $("#spinner").removeClass("hide");
        // clear content
        $("#restaurants").html("");
    });
}

// Creats button to find nearby restaurants of user
if (nearbyButton) {
    nearbyButton.addEventListener("click", function (event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(getCurrentLocation); // from W3
        // unhide spinner
        $("#spinner").removeClass("hide");
        // clear content
        $("#restaurants").html("");
    });
}

// Creats button to list favorites
if (favoritesButton) {
    favoritesButton.addEventListener("click", function (event) {
        event.preventDefault();
        displayRestaurants(favRestaurants)
    });
}

// Finds the current location of the user
function getCurrentLocation(position) {
    let coord = {
        "lat": position.coords.latitude,
        "lon": position.coords.longitude
    }
    getFood(coord);
}