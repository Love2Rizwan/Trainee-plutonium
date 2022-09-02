const express = require('express');
const logger = require('../logger/logger')
const validator = require('../validator/formatter')
const util = require('../util/helper.js')

const router = express.Router();


router.get('/test-me', function (req, res) {
    //Module 1
    logger.welcome()

    //Module2
    util.printDate()
    util.printMonth()
    util.getBatchInfo()

    //Module3
    validator.trim("     FunctionUp ")
    validator.changeToUpperCase("     FunctionUp ")
    validator.changeToLowerCase("     FunctionUp ")

    res.send('My first ever api!')
});

module.exports = router;
// adding this comment for no reason