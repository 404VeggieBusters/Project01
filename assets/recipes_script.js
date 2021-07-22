var key = "ca05cdaee13841619a5e1291c78b6eb3";

$(document).ready(function(){
    var modal = $('.modal').modal();
});

$("#searchButton").on("click", function(event){
    event.preventDefault();
    let searchBox = $("#search-box").val();
    let diet = $('input[name="diet"]:checked').val();

    callSpoonacularSearchAPI(searchBox, diet);
});

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

        if (data["results"].length === 0){
            $('.modal').modal('open');
            return;
        }

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