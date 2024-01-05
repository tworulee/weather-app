import React, { useState } from 'react';
import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import humidity from '../assets/humidity.png';
import rain from '../assets/rain.png';
import search from '../assets/search.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';
import "./WeatherApp.css"

export const WeatherApp = () => {
  const [wicon,setWicon] = useState(cloud)

  const api_key="";  // Add api key

  const searchh =async ()=>{
    const element = document.getElementsByClassName("cityInput")
    if(element[0].value === ""){
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
    let response = await fetch(url)
    let data = await response.json();
    
    const humidityPercent = document.getElementsByClassName("humidity-percent")
    const windRate = document.getElementsByClassName("wind-rate")
    const weatherTemp = document.getElementsByClassName("weather-temp")
    const weatherLocation = document.getElementsByClassName("weather-location")

    humidityPercent[0].innerHTML = data.main.humidity
    windRate[0].innerHTML = Math.floor(data.wind.speed)
    weatherTemp[0].innerHTML =  Math.floor(data.main.temp)
    weatherLocation[0].innerHTML = data.name

    if(data.weather[0].icon === "01d"  || data.weather[0].icon === "01n"){
      setWicon(clear)
    }
    else if(data.weather[0].icon === "02d"  || data.weather[0].icon === "02n"){
      setWicon(cloud)
    }
    else if(data.weather[0].icon === "03d"  || data.weather[0].icon === "03n"){
      setWicon(drizzle)
    }
    else if(data.weather[0].icon === "04d"  || data.weather[0].icon === "04n"){
      setWicon(drizzle)
    }
    else if(data.weather[0].icon === "09d"  || data.weather[0].icon === "09n"){
      setWicon(rain)
    }
    else if(data.weather[0].icon === "10d"  || data.weather[0].icon === "10n"){
      setWicon(rain)
    }
    else if(data.weather[0].icon === "13d"  || data.weather[0].icon === "13n"){
      setWicon(snow)
    }
    else{
      setWicon(clear)
    }

  }

  return (
    <div className="container">
      <div className="top-bar">
        <input className="cityInput" type="text" placeholder="search"  />
        <div className="search-icon" onClick={searchh}>
          <img src={search} />
        </div>
      </div>
      <div className='weather-image'>
        <img src={wicon} />
      </div>
      <div className='weather-temp'>23</div>
      <div className='weather-location'>London</div>
      <div className="data-container">
        <div className='element'>
          <img src={humidity} className='icon' />
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind} className='icon' />
          <div className='data'>
            <div className='wind-rate'>12 km/</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
