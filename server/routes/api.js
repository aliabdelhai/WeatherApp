const express = require('express')
const router = express.Router()
const urllib = require('urllib');
const City = require('../models/City');


const KELVIN = 273.15;
const key = "f5010983abecf7074bb4c1dd5c5c44ab";

router.get('/city/:cityName', async (req, res) => {
    const { cityName } = req.params
    urllib.request(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`, function (err, response) {
        const city = JSON.parse(response.toString())
        const mapData = {
            name: city.name,
            temperature: parseFloat((city.main.temp - KELVIN).toFixed(2)),
            condition: city.weather[0].description,
            conditionPic: city.weather[0].icon
        }
        res.send(mapData)
    })
})

router.get('/cities', async (req, res) => {
    try {
        const cities = await City.find({})
        res.send(cities)
    } catch (error) {
        res.send(error)
    }
})

router.post('/city', async (req, res) => {
    try {
        const city = new City(req.body)
        await city.save()
        res.send(city)
    } catch (error) {
        res.send(error)
    }
})

router.delete('/city/:cityName', async (req, res) => {
    const { cityName } = req.params
    const city = await City.findOneAndDelete({ name: cityName })
    res.send(city)
})

module.exports = router