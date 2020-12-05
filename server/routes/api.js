const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const urllib = require('urllib');
const City = require('../models/City');

mongoose.connect('mongodb://localhost/weatherDB', { useNewUrlParser: true })


// const c = new City({name: "New York", temperature: 3.01, condition: "overcast clouds", conditionPic: "04d"})
// c.save()

const KELVIN = 273.15;
const key = "f5010983abecf7074bb4c1dd5c5c44ab";

// urllib.request(`http://api.openweathermap.org/data/2.5/weather?q=New York&appid=${key}`, function(err, response){
//     const firstCity = [JSON.parse(response.toString())]
//     const mapData = firstCity.map(fc => ({'city': fc.name, 'country': fc.sys.country, 'temperature': fc.main.temp, 'id': fc.weather[0].id, 'description': fc.weather[0].description, 'icon': fc.weather[0].icon}))
//     router.get('/firstCity', function (req, res) {
//         res.send(mapData)
//     })
// })


router.get('/city/:cityName', async (req, res) => {
    const cityName = req.params.cityName
    urllib.request(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`, function(err, response){
    const city = JSON.parse(response.toString())
    const mapData = {'name': city.name, 'temperature': parseFloat((city.main.temp-KELVIN).toFixed(2)), 'condition': city.weather[0].description, 'conditionPic': city.weather[0].icon}
    res.send(mapData)
   
    })
})

router.get('/cities', async (req, res) => {
    try{
        const cities = await City.find({})
        res.send(cities)
    } catch(error){
        res.send(error)
    }  
})

router.post('/city', async (req, res) => {
    try{
        console.log(req.body)
        const city = new City(req.body)
        await city.save()
        console.log(city)
        res.send(city)
    } catch(error){
        res.send(error)
        console.log('haha')
    }
})

router.delete('/city/:cityName', async (req, res) => {
    const { cityName } = req.params
    const city = await City.findOneAndDelete({name: cityName})
    res.send(city)

})


module.exports = router