const apikey = "4dfe79b3472984bfe548876a1c133b83";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.getElementById("weatherIcon");

async function CheckWeather(City) {
    const response = await fetch(apiUrl + City + `&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
    
        console.log(data);
        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "./cloudy.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "./clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "./rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "./drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "./mist.png";
        }
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchButton.addEventListener("click", () => {
    CheckWeather(searchBox.value);
});

// Optionally, you can call the function with a default city when the page loads
CheckWeather("London");
