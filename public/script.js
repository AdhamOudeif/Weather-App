//This file is the javascript which calls the weather API for us and return the information 
const searchElement = document.querySelector('[data-city-search') //get us search element from html input
const searchBox = new google.maps.places.SearchBox(searchElement) //from google api
//any time the box in html has a place selected inside of it, the code in the function below is called
searchBox.addListener('places_changed', ()=>{
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    //check to ensure place exists, may not need this
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    //call our api that we created:
    fetch('/weather', {
        method: 'POST',
        //ensure that our app knows we're sending it javascript
        headers: {
            'Content-Type': 'application/json', //we are gonna send json
            'Accept': 'application/json', //we will accept json
            "Access-Control-Allow-Origin" : "*", 
            "Access-Control-Allow-Credentials" : true 
        },
        //send body of app, but first we need to convert it to json
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
        //take in data we returned, and convert it to json. Next, give data in object format
    }).then(res => res.json()).then(data => {
        // console.log(data)
        setWeatherData(data, place.formatted_address) //send select box string to header inside web page

    })
})

const icon = new Skycons({color: '#222'})
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')
icon.set('icon', 'clear-day')
icon.play()

function setWeatherData(data, place){
locationElement.textContent = place
statusElement.textContent = data.summary //pulling from the object
temperatureElement.textContent = data.temperature
precipitationElement.textContent = '${data.precipProbability * 100}%'
windElement.textContent = data.windSpeed
icon.set('icon', data.icon)
icon.play()
}