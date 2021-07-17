


$("#searchButton").addEventListener("click", function(event){
    event.preventDefault();
    let searchBox = $("#search-box").val();
    let diet = $('input[name="diet"]:checked').val();

    callSpoonacularSearchAPI(searchBox, diet);


});


function callSpoonacularSearchAPI(searchBox, diet){
    let key = "2eb98eaed78c4117ae15b00c1b061474";

    let queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + searchBox +"&diet=" + diet + "&number=9&apiKey=" + key;

    fetch(queryURL)
    .then(function (response) {
        if (response.status === 404) {

        }

        return response.json();
    })
    .then(function (data) {
        // Check if the response is 200
        console.log(data);
        let boxSelector = $(".box");
        for (let i = 0; i < boxSelector.length; i++){
            $(boxSelector[i]).html(data["results"][i]["title"]);
            $(boxSelector[i]).append("<img src='" + data["results"][i]["image"] +"'>")
        }
    }); 
}
