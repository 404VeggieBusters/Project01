// variable for cities
var cityLocation = document.getElementById("cityLocation");
// variable for search
var searchButton = document.getElementById("searchButton");
var nearbyButton = document.getElementById("nearbyButton");

// paragraph location 
var pLocationVariable = "${restaurants[i].location.display_address}";

// paragraph phone number
var pNumberVariable = "${restaurants[i].display_phone}";

// image variable
var imgVariable = "${restaurants[i].image_url}";

// heading variable
var headVariable = "${restaurants[i].name}";

// button (I Like This) variable
var likeThisButton = "${restaurants[i]}";


// variable for cors
var corsAnywhere = "https://cors-anywhere-bc.herokuapp.com/"
// variable for ALL the API keys that we use
// Recipe API
var suggesticAPI = "b3c04215f109c6bfb89a65bf7fa97bca24f3a1be";
// Location API
var xyzGeocodeAPI = "575609437300452386840x18086";
// yelp Api
var yelpAPI = "2QBglnFCVDpjaktvp3S9GFKkMJ52FQnfvEiaUVitSMYpgAKJzA56FMTp8F1RZElq6X1iDSW4wZonXGeSONZJQHzSLk3TT31LrJ_hzgCT9ZOykvEChChAD8rV6CPzYHYx";


$(document).ready(function () {
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

    if (restaurants.length === 0) {
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
    }
    // adding like button to restaurant cards 
    // var likeThisButton = document.createElement("button");



    let row = document.createElement("div");
    row.classList.add("row");
    let card = document.createElement("card");
    card.classList.add("card");
    let heading = document.createElement("h4");
    heading.innerText = headVariable;
    let paragraphLocation = document.createElement("p");
    paragraphLocation.innerText = pLocationVariable;
    let paragraphPhone = document.createElement("p");
    paragraphPhone.innerText = pNumberVariable;
    let picture = document.createElement("img");
    picture.src = imgVariable;
    let btn = document.createElement("button");
    btn.classList.add("likeThisButton");
    btn.addEventListener("click", doSomething);

    card.append(heading);
    card.append(paragraphLocation);
    card.append(paragraphPhone);
    card.append(picture);
    card.append(button);

    row.append(card);

    function doSomething(event) {
        event.preventDefault();
// loop possiblities of if someone clicks button and if they don't

    // if (likeThisButton !== null) {
        // insert condition
        // else {
            // condition
        // }

    //     for (var i = 0; i < highScorez.length; i++) {

    //         var createLi = document.createElement("li");
    //         createLi.textContent = highScorez[i].initials + " " + highScorez[i].score;
    //         highScorez.appendChild(createLi);
    //     }
        for(var i = 0; i < likeThisButton; i++);

    }

    function myFunction(element) {
        element.getElementByClass("likeThisButton").style.color = "green";
    }


    }
    // Jess' Tasks (Don't touch please!!)
// set it as local storage in fav restaurants -2 
// function favRestaurant() 
// localStorage.setItem("") -3 (set a key- fav rest. and push name into key you created in local storage)
// check local storage of names of restaurants / turn color of button -4
// can only save data from string to array (json.parse) -5
// bring json into storage (bringing back json= google)!!
// display user input in local storage
// store JavaScript object 
localStorage.setItem('favRestaurant', JSON.stringify(favRestaurant));
console.log(favRestaurant); 
// to retrieve from storage and convert it to an object again 
var likeThisButton = JSON.parse(localStorage.getItem('iLikeThis'));
console.log("button like this");
// use parse to get data from websites to get only what we need (lesson 6 - activity 7)
// look at lesson 6 - activity 23
// create local storage for different pages to be stored
    // How do I add <div class="col offset-s3 s4"> and <div class="col s2"> to the card that I created?


    // don't changes the codes below with the backticks and append row and coordinates (3 lines)!
`;
        $("#restaurants").append(row);
        getDistanceToRestaurant(restaurants[i], coordinates);

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
        url: ${ corsAnywhere } https://api.yelp.com/v3/businesses/search?latitude=${coordinates.lat}&longitude=${coordinates.lon}&categories=vegan&limit=50`,
    method = "GET",
        headers = {
        Authorization: "Bearer " + yelpAPI
    }
        .then(function (response) {
    console.log(response)
    // display results
    if (response.businesses.length) {

        displayRestaurants(response.businesses, coordinates);
    }
});
// .catch(function (error) {
//     alert('Unable to connect to GitHub');
// });



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
