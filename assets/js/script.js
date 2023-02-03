var APIKey = "f4cc82078e0999601d888c5956e645ef";
var city = document.querySelector("#city-selector");
var submitBtn = document.querySelector('button');
var fiveDayEl = document.querySelector('.five-day')
var current=document.querySelector(".current")
var unitIsFarenheit = true;
var cityName=document.querySelector('.cityName')
var cityWindSpeedCurrent=document.querySelector('.cityWindSpeed')
var cityTemp=document.querySelector('.cityTemp')
var cityHumidityCurrent= document.querySelector('.cityHumidity')
var currentDate=document.querySelector(".current-date")
var cityCurrentConditions=document.querySelector(".city-conditions-current")

var today = dayjs();
$('#currentDay').text(today.format('dddd, MMMM D'));



//rendering the current weather
function renderCurrentWeather(weather){
    console.log(weather)
    cityName.textContent=`${weather.city.name}`
    cityWindSpeedCurrent.textContent=`Wind Speed: ${weather.list[0].wind.speed} mph`
    cityHumidityCurrent.textContent=`Humidity: ${weather.list[0].main.humidity}%`
    cityTemp.textContent=`Temperature: ${weather.list[0].main.temp} F`
cityCurrentConditions.textContent= `Conditions: ${weather.list[0].weather[0].description}`


var date= new Date(weather.list[0].dt *1000)
var formatedDate=date.toLocaleDateString()
currentDate.textContent=formatedDate
    }


function weatherSearch() {
    //forecast
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.value + "&appid=" + APIKey + "&units=imperial" + "&iconSet=icons1";

   
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            console.log(city.value)
            renderFiveDay(data)
            renderCurrentWeather(data)
            
        })
    saveHistory()

}



//save to local storage
function saveHistory() {
    var cityHistory = JSON.parse(localStorage.getItem('history')) || []
    var searchHistory = JSON.parse(localStorage.getItem('history')) || []
    cityHistory.push(city.value)
    console.log(cityHistory)

var savedCities= $('#saved-cities')
for (i = 0; i < searchHistory.length; i++) {
    var cityLi = searchHistory[i];
    console.log(cityLi);
    var li = $("<li>").addClass("info");
    li.text(cityLi);
    li.attr("data-index", i);

   // var button = document.createElement("button");
   // button.textContent = "Check Weather";

   // li.appendChild(button);
    savedCities.append(li);
    // console.log(savedCities);
  }

    localStorage.setItem('history', JSON.stringify(cityHistory))

}


//render the 5 day forecast
function renderFiveDay(weather) {
    // console.log(weather)
    fiveDayEl.innerHTML="";
    for (var i = 0; i < weather.list.length; i = i + 8) {
        console.log(weather.list[i])
        var card = document.createElement('div')
        //shows the temp
        var cityTemp = document.createElement('h3')
        cityTemp.textContent = `Temp: ${weather.list[i].main.temp} °F`
        //shows the windspeed
        var cityWindSpeed = document.createElement('h3')
        cityWindSpeed.textContent = `Wind speed: ${weather.list[i].wind.speed} mph`
        //shows the humidity
        var cityHumidity = document.createElement('h3')
        cityHumidity.textContent = `Humidity: ${weather.list[i].main.humidity}%`
        //shows condition-still not working
        var cityCondition = document.createElement('h3')
        cityCondition.textContent= `conditions: ${weather.list[i].weather[0].description}`
        // shows the icon
        var icon = document.createElement('img')
        icon.src= `https://openweathermap.org/img/wn/${weather.list[i].weather[0].icon}.png`
   
//shows the date
var dateFiveDay= new Date(weather.list[i].dt *1000)
var formatedDateFiveDay=dateFiveDay.toLocaleDateString()
var createDateEl =document.createElement('h3')
createDateEl.textContent=`${formatedDateFiveDay}`




//calling the changes to the div

        card.setAttribute("class", "card")
        fiveDayEl.appendChild(card)
        card.append(createDateEl)
        card.append(cityTemp)
        card.append(cityHumidity)
        card.append(cityWindSpeed)
        card.append(cityCondition)
        card.append(icon)


    }

}



submitBtn.addEventListener('click', weatherSearch);








// fetch(queryURL)
// .then(function(response){
//     return response.json()
// })
// .then(function(data){
//     console.log(data)
//     console.log(city)
// })
//making a change
