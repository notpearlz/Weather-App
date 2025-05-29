const form = document.querySelector("form");
const search = document.getElementById("search");
const weathergif = document.getElementById("weathergif");

const weather = document.getElementById("weather");
const temp = document.getElementById("temp");

const weatherKey = "PS4QY6XPQUKYHGGSU3JN5G9TL";
const gifKey = "tIzb3AThmrdJciOYx1YVs7LuogxMzFQC";

const searchWeather = async (location) => {

    try {
        const responseWeather = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location +"?key=" + weatherKey, {mode: "cors"});
        const jsonWeather = await responseWeather.json();


        // display weather information
        console.log(jsonWeather);
        temp.innerHTML = jsonWeather.currentConditions.temp;
        weather.innerHTML = jsonWeather.currentConditions.icon

        // display gif information
        const responseGif = await fetch("https://api.giphy.com/v1/gifs/translate?api_key="+ gifKey + "&s=" + jsonWeather.currentConditions.icon  ,  {mode: "cors"});
        const jsonGif = await responseGif.json();

        weathergif.setAttribute("src", jsonGif.data.images.original.url)
    } catch(err) {
        console.log(err)
    }


}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;

    searchWeather(location);
})