//load in env variables
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config() //loads in everything put in .env file
}

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY //gets populated by above statement
const axios = require('axios') //similar to fetch
const { response } = require('express')
const express = require('express') //set up server
const app = express() //set up app

app.use(express.json()) //set up what app will use
app.use(express.static('public')) //set up static folder

//api will only have single endpoint, this will get the weather from Weather Stack API
//in backend for security
app.post('/weather', (req, res) => {
    const URL = 'https://api.weatherstack.com/forecast?${WEATHERSTACK_API_KEY}&query=${req.body.latitude},${req.body.longitude}?units=auto'
    axios({
        url: URL,
        responseType: 'json'
    }).then(data => res.json(data.data.currently))
    console.log(req.body) //make sure info is being sent to server
})

//Tell server what to do
app.listen(3000, ()=>{
    console.log('Server Started')
})