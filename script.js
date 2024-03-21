let todayName = document.getElementById("today-date-day-name")
let todayNumber = document.getElementById("today-date-day-number")
let todayMonth = document.getElementById("today-date-month")
let todayLocation = document.getElementById("today-location")
let todayTemp = document.getElementById("today-temp")
let todayConditionImg = document.getElementById("today-condition-img")
let todayConditiontext = document.getElementById("today-condition-text")
let todayHumidity = document.getElementById("humditiy")
let todayWind = document.getElementById("wind")
let todayWindDirection = document.getElementById("wind-direction")
let searchInput = document.getElementById("search")

let nextDay = document.getElementsByClassName("next-day-name ")
let nextMaxTemp = document.getElementsByClassName("next-max-temp")
let nextMinTemp =  document.getElementsByClassName("next-min-temp")
let nextConditionImg =  document.getElementsByClassName("next-condition-img")
let nextConditionText =  document.getElementsByClassName("next-condition-text")


// fetch app
async function getWeatherData (cityName){
let weatherResponse = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=daffceacc6ee4471b2f115228241501&q=${cityName}&days=3`)
let weatherData = await weatherResponse.json()
return weatherData;

}


// display today data
function displayTodayData(data){
    let todayDate = new Date()
    todayName.innerHTML= todayDate.toLocaleDateString("en-us", {weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML= todayDate.toLocaleDateString("en-us", {month:"long"})
    todayLocation.innerHTML= data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src",data.current.condition.icon)
    todayConditiontext.innerHTML= data.current.condition.text
    todayHumidity.innerHTML = data.current.humidity + "%"
    todayWind.innerHTML = data.current.wind_kph + "km/h"
    todayWindDirection.innerHTML= data.current.wind_dir


}


// display next day data
function displayNextData(data){
    let forecastData = data.forecast.forecastday
    for (let i = 0; i < 2 ; i++) {
       let nextDate = new Date (forecastData[i+1].date) 
       nextDay[i].innerHTML= nextDate.toLocaleDateString("en-us", {weekday: "long"})
       nextMaxTemp[i].innerHTML= forecastData[i+1].day.maxtemp_c
       nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
       nextConditionImg[i].setAttribute("src", forecastData[i+1].day.condition.icon)
       nextConditionText[i].innerHTML= forecastData[i+1].day.condition.text
        
    }
    
}

// start app
 async function startApp(city ="cairo"){
   let weatherData = await getWeatherData(city)
   if(!weatherData.error){
    displayTodayData(weatherData)
    displayNextData(weatherData)
   }
  
}
startApp()


// search
searchInput.addEventListener("input", function(){
    startApp(searchInput.value)
})












