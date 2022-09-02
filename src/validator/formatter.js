function trim(str) {
    str = str.trim()
    console.log("After trimming:" + str)
}

function changeToUpperCase(str) {
    str = str.toUpperCase()
    console.log("After changing to upper:" + str);
}

function changeToLowerCase(str) {
    str = str.toLowerCase()
    console.log("After changing to lower:" + str);
}

module.exports.trim = trim
module.exports.changeToUpperCase = changeToUpperCase
module.exports.changeToLowerCase = changeToLowerCase