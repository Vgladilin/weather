// 76.90134 43.248622
//https://api.openweathermap.org/data/2.5/onecall?lat=48.785835&lon=-122.40642&appid=32304bca70420a2d98a8d0fc2416a813&units=metric
// console.log("hw")
let lat = 48.785835
// 76.90134
let lon = -122.40642
// 43.248622
const API_KEY = "32304bca70420a2d98a8d0fc2416a813"

$( document ).ready(function() {
    getWeather()
});
function renderContent(content){
    console.log(content)

    document.querySelector("#currentTemp").innerText = Math.round(content.current.temp) + "°"
    document.querySelector("#city").innerText = content.timezone
    document.querySelector("#currentDate").innerText = new Date(content.current.dt * 1000).toLocaleDateString('en-US',{weekday:'long'});
    document.querySelector("#pressure").innerText = content.current.pressure
    document.querySelector('#windSpeed').innerText = content.current.wind_speed
    document.querySelector('#humidity').innerText = content.current.humidity
    document.querySelector('#cloudness').innerText = content.current.clouds
    document.querySelector('#currentState').innerText = content.current.weather[0].main
    const mainIcon = content.current.weather[0].icon
    document.querySelector('#currentIcon').src = `https://openweathermap.org/img/wn/${mainIcon}.png`
    for(let i=1; i<=4; i++){
        const iconLocation = content.daily[i].weather[0].icon
        document.querySelector('#day' + i).innerText = new Date(content.daily[i].dt*1000).toLocaleDateString('en-US', {weekday:'long'})
        document.querySelector('#pic'+ i).src = `https://openweathermap.org/img/wn/${iconLocation}.png`
        document.querySelector('#temp' + i).innerText = Math.round(content.daily[i].temp.day) + "°"
        document.querySelector('#state' + i).innerText = content.daily[i].weather[0].main
    }
}
function getWeather(){
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/onecall',
        type: 'GET',
        dataType: 'json',
        data: {
            lat: lat,
            lon: lon,
            appid: API_KEY,
            units: "metric"
        },
        success (response) {
            console.log('its OK')
            renderContent(response)
        },
        onerror (err) {
            console.log(err)
        }
    });
}
function getCoords() {
    if (!checkLsCoords()){
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                console.log(lat, lon)
                saveLsCoords({'lat': lat, 'lon': lon})
                getWeather()
            });
        } else {
            alert('Ваш браузер - старый')
        }
    }else{
        setCoordsLs()
        getWeather()
    }

}

function saveLsCoords(coords={}){
    let coordsForSave = JSON.stringify(coords)
    localStorage.setItem('coords', coordsForSave)
}

function checkLsCoords(){
    return ( (localStorage.getItem('coords') || '').length > 0)
}

function setCoordsLs(){
    let coordsStr = localStorage.getItem('coords')
    let coords = JSON.parse(coordsStr)
    lat = coords.lat
    lon = coords.lon
}
