const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const WeatherController= require("../controllers/weatherController")
const MemeController= require("../controllers/memeController")


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.post("/cowin/getOtp", CowinController.getOtp)
router.post("/cowin/getByDistrict", CowinController.getByDistrict)

// Weather

router.get('/weather/getWeather', WeatherController.getWeather)
router.get('/weather/onlyTemp', WeatherController.onlyTemp)
router.get('/weather/sortByTemp', WeatherController.sortByTemp)

//  Memes

router.get('/meme/getAllMemes', MemeController.getAllMemes)
router.post('/meme/captionImage', MemeController.captionImage)

module.exports = router;