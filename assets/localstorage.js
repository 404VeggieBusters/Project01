var favRestaurants = [];
var favoritesButton = document.getElementById("favoritesButton");
let favRestaurantsFromStorage = localStorage.getItem("favRestaurants");
if (favRestaurantsFromStorage) {
    favRestaurants = JSON.parse(favRestaurantsFromStorage);
}
console.log("Loading Local Storage", favRestaurants)

$(document).on("click", ".like-btn", function(event){
    $(event.target).prop('disabled', true).addClass('disabled');
    // console.log("LIKE", event.target)
    // event.target = "Added to favorites!";
    //favoritesButton.innerHTML = "Added to favorites";
    let restaurantId = $(event.target).attr("id").replace("like", "")
    console.log(restaurantId);
    let restaurant = restaurantList.find(function(rest){
        return rest.id === restaurantId;
    })
    console.log(restaurant)
    if (restaurant) {
        favRestaurants.push(restaurant);
        localStorage.setItem("favRestaurants", JSON.stringify(favRestaurants));
    }
    
})

