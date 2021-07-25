// API key for Spoonacular API
var key = "6ce882f5c360449f8c0b044f1f3f6e40";
// sets the modal for materialize
$(document).ready(function(){
    var modal = $('.modal').modal();
});
// input recipe search
$("#searchButton").on("click", function(event){
    event.preventDefault();
    let searchBox = $("#search-box").val();
    let diet = $('input[name="diet"]:checked').val();

    callSpoonacularSearchAPI(searchBox, diet);
});

// calls the API to find recipes from the search 
function callSpoonacularSearchAPI(searchBox, diet){
    let queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + searchBox +"&diet=" + diet + "&number=12&apiKey=" + key;
    fetch(queryURL)
    .then(function (response) {
        if (response.status === 404) {
        }
        return response.json();
    })
    .then(function (data) {
        // Check if the response is 200
        console.log(data);
        // opens modal if recipe not found
        if (data["results"].length === 0){
            $('.modal').modal('open');
            return;
        }
        // Adds recipe information to be displayed 
        $(".recipe-box").css("display", "none");
        $("#recipes-result").removeAttr("style");
        let recipeBoxSelector = $(".recipe-box");
        let boxSelector = $(".card-title");
        let imgSelector = $(".recipe-img");
        for (let i = 0; i < boxSelector.length; i++){
            getRecipeInfo($(boxSelector[i]), data["results"][i]["id"]);
            $(boxSelector[i]).html(data["results"][i]["title"]);
            $(imgSelector[i]).attr("src",  data["results"][i]["image"]);
            $(recipeBoxSelector[i]).attr("style", "");
        }
    }); 
}
// gets the recipe info from the API (image, name, and URL link)
function getRecipeInfo(box, id){
    let queryURL = "https://api.spoonacular.com/recipes/" + id + "/information?&apiKey=" + key;
    fetch(queryURL)
        .then(function (response) {
            if (response.status === 404) {
            }
            return response.json();
        })
        .then(function (data) {
            // Check if the response is 200
            console.log(data);
            box.attr("href", data["sourceUrl"]);
        }); 
}