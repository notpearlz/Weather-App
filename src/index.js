import { reloadDom } from "./modules/domLoader";


const form = document.querySelector("form");
const search = document.getElementById("search");

const weatherKey = "PS4QY6XPQUKYHGGSU3JN5G9TL";
const gifKey = "tIzb3AThmrdJciOYx1YVs7LuogxMzFQC";

//TODO
// Add weather icons with dynamic imports
// Figure out a design and implement it

const searchWeather = async (location) => {

    try {
        const responseWeather = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location +"?key=" + weatherKey, {mode: "cors"});
        const jsonWeather = await responseWeather.json();


        // display weather information


        // display gif information
        const responseGif = await fetch("https://api.giphy.com/v1/gifs/translate?api_key="+ gifKey + "&s=" + jsonWeather.currentConditions.icon + " sky"  ,  {mode: "cors"});
        const jsonGif = await responseGif.json();

        if(jsonWeather && jsonGif){
            console.log(jsonWeather);
            console.log(jsonGif);

            reloadDom(jsonWeather, jsonGif);

        }
    } catch(err) {
        console.log(err);
    }


}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;

    searchWeather(location);
})