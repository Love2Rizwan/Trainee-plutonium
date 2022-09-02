function printDate() {
    let date = new Date
    console.log("Today's date: " + date.getDate());
}

function printMonth() {
    let date = new Date
    console.log("Today's month: " + (date.getMonth() + 1));
}

function getBatchInfo() {
    console.log("Plutonium, W3D1, the topic for today is Nodejs module system");
}

module.exports.printDate = printDate
module.exports.printMonth = printMonth
module.exports.getBatchInfo = getBatchInfo