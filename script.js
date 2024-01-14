const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "a91d0e1a525576415e8eb4a30ce5d290";
  const city = document.querySelector(".search-box input").value;

  if (city === "") {
    return;
  }

  // const isDay; // Move isDay definition outside the callback function
  let resultHours; // Declare resultHour variable to store the hour value



  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/worldtime?city=' + city,
    headers: { 'X-Api-Key': 'uUMy7vNiMtgj1N3cPT+XXQ==DVMBDaqXCtfBoZDp'},
    contentType: 'application/json',
    success: function(result) {
        resultHours = result.hour;
        console.log(resultHours);
        console.log(result);

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
        )
          .then((response) => {
            console.log(response.status);
            if (response.ok==404) {
              // container.style.height = '400px';
              // weatherBox.classList.remove('active');
              // weatherDetails.classList.remove('active');
              // error404.classList.add('active');
              // throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((json) => {
      
            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');
      
            const background = document.querySelector("body");
            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(".weather-box .temperature");
            const description = document.querySelector(".weather-box .description");
            const humidity = document.querySelector(".weather-details .humidity span");
            const wind = document.querySelector(".weather-details .wind span");
            function isDaytime() {
              return (resultHours >= 6 && resultHours < 18); // Assuming day time is between 6 AM to 6 PM
            }
      
            // const isDay = isDaytime();
            console.log(isDaytime());
            console.log(json);
      
            if (json.weather && json.weather.length > 0) {
              if(isDaytime()==true){
                switch (json.weather[0].main) {
                  case "Clear":
                    image.src = "images/clear.jpeg";
                    background.style.backgroundImage = "url(images/clearday.jpeg)";
                    break;
                  case "Clouds":
                    image.src = "images/cloud.jpeg";
                    background.style.backgroundImage = "url(images/cloudyday.jpg)";
                    break;
                  case "Mist":
                    image.src = "images/mist.jpeg";
                    background.style.backgroundImage = "url(images/mistyday.jpeg)";
                    break;
                  case "Rain":
                    image.src = "images/rain.jpeg";
                    background.style.backgroundImage = "url(images/rainyday.jpeg)";
                    break;
                  case "Snow":
                    image.src = "images/snow.jpeg";
                    background.style.backgroundImage = "url(images/snowday.jpeg)";
                    break;
                  case "Fog":
                    image.src = "images/snow.jpeg";
                    background.style.backgroundImage = "url(images/fogyday.jpeg)";
                    break;
                  default:
                    image.src = "images/cloud.jpeg";
                    background.style.backgroundImage = "url(images/mistyday.jpeg)";
                }
              }
              else{
                switch (json.weather[0].main) {
                  case "Clear":
                    image.src = "images/moon-png.jpeg";
                    background.style.backgroundImage = "url(images/clearnight.jpeg)";
                    break;
                  case "Clouds":
                    image.src = "images/cloudymoon.jpeg";
                    background.style.backgroundImage = "url(images/cloudynight.jpeg)";
                    break;
                  case "Mist":
                    image.src = "images/mistymoon.jpeg";
                    image.style = "filter: drop-shadow(0 0 0.75rem black);"
                    background.style.backgroundImage = "url(images/mistynight.jpeg)";
                    break;
                  case "Rain":
                    image.src = "images/rainymoon.jpeg";
                    background.style.backgroundImage = "url(images/rainynight1.jpeg)";
                    break;
                  case "Snow":
                    image.src = "images/snowmoon.jpeg";
                    background.style.backgroundImage = "url(images/snownight.jpeg)";
                    break;
                  case "Fog":
                    image.src = "images/foggymoon.jpeg";
                    background.style.backgroundImage = "url(images/foggynight.jpeg)";
                    break;
                  default:
                    image.src = "images/moon-png.jpeg";
                    background.style.backgroundImage = "url(images/clearnight.jpeg)";
                }
              }
      
              temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
              description.innerHTML = `${json.weather[0].description}`;
              humidity.innerHTML = `${json.main.humidity}%`;
              wind.innerHTML = `${parseInt(json.wind.speed)}Km/hr`;
            }
          })
          .catch((error) => console.error("Error fetching weather data:", error));


    },
    error: function ajaxError(jqXHR) {
        
      container.style.height = '400px';
      weatherBox.classList.remove('active');
      weatherDetails.classList.remove('active');
      error404.classList.add('active');
        
      // console.error('Error: ', jqXHR.responseText);
    }
});

  
});
