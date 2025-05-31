import "../styles.css"

const main = document.querySelector(".container");

export const reloadDom = (weatherData, gifData) => {
    reloadWeather(weatherData);
    reloadGif(gifData);
}


const reloadWeather =(data)=>{

    if(document.querySelector(".weather-section")){
        document.querySelector(".weather-section").remove();
    }
    const weatherSection = document.createElement("section");
    weatherSection.classList.add("weather-section");

    // Main Weather Divs
    const weatherMain = document.createElement("div");
    weatherMain.classList.add("weather-main");

    const weatherFuture = document.createElement("div");
    weatherFuture.classList.add("weather-future");

    (function MainWeather(){
        // Current Weather Conditions
        const weatherCurrent = document.createElement("div");
        weatherCurrent.classList.add("weather-current");

        //
        // Current Weather Status
        //
        const currentStatus = document.createElement("div");
        currentStatus.classList.add("weather-status");

        const img = document.createElement("img");
        (async ()=> {
            const icon = await import (`../assets/Weather-Icons/${data.currentConditions.icon}.svg`)
            img.src = icon.default;

        })();

        const temp = document.createElement("p");
        temp.innerHTML = data.currentConditions.temp;
        currentStatus.append(img);
        currentStatus.append(temp);

        //
        // Current Weather Details
        //
        const currentDetails = document.createElement("div");
        currentDetails.classList.add("weather-details");


        const precipitation = document.createElement("p");
        precipitation.innerHTML = "Precipitation " + data.currentConditions.precip + "%";

        const humidity = document.createElement("p");
        humidity.innerHTML =  "Humidity " + data.currentConditions.humidity;

        const wind = document.createElement("p");
        wind.innerHTML = "Wind: " + (data.currentConditions.windspeed*10) + " mph";

        currentDetails.append(precipitation);
        currentDetails.append(humidity);
        currentDetails.append(wind);


        //
        // Current Weather Summary
        //
        const weatherSummary = document.createElement("div");
        weatherSummary.classList.add("weather-summary");

        const weather = document.createElement("p");
        weather.innerHTML = "Weather";

        const time = document.createElement("p");
        time.innerHTML = daysofWeek[new Date(data.days[0].datetime).getDay()];

        const condition = document.createElement("p");
        condition.innerHTML = data.currentConditions.conditions;


        weatherSummary.append(weather);
        weatherSummary.append(time);
        weatherSummary.append(condition);



        //
        // Appending
        //
        weatherCurrent.append(currentStatus);
        weatherCurrent.append(currentDetails);

        weatherMain.append(weatherCurrent);
        weatherMain.append(weatherSummary);

        weatherSection.append(weatherMain);
        
    })();


    (function FutureWeather(){
        const weatherFuture = document.createElement("div");
        weatherFuture.classList.add("weather-future");

        for(let i = 0; i < 7; i++){
            const card = document.createElement("div");

            const img = document.createElement("img");
            (async ()=> {
                const icon = await import (`../assets/Weather-Icons/${data.days[i].icon}.svg`)
                img.src = icon.default;

            })();

            const time = document.createElement("p");
            time.innerHTML = daysofWeek[new Date(data.days[i].datetime).getDay()];

            const tempRange = document.createElement("p");
            tempRange.innerHTML = data.days[i].temp;
            card.append(img);
            card.append(time);
            card.append(tempRange);
            weatherFuture.append(card);

        }

        weatherSection.append(weatherFuture);

    })();

    main.append(weatherSection);
}


const reloadGif = (data)=> {
    if(document.querySelector(".weathergif")){
        document.querySelector(".weathergif").remove();
    }
    const weathergif = document.createElement("img");
    weathergif.classList.add("weathergif");

    main.append(weathergif);
    weathergif.setAttribute("src", data.data.images.original.url)
}


const daysofWeek = {
    0 : "Sunday",
    1 : "Monday",
    2 : "Tuesday",
    3 : "Wednesday",
    4 : "Thursday",
    5 : "Friday",
    6 : "Saturday",
}