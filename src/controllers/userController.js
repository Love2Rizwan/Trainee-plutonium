const UserModel = require("../models/userModel");

const basicCode = async function (req, res) {
    try {
        let tokenDataInHeaders = req.headers.token;
        console.log(tokenDataInHeaders);

        console.log("HEADER DATA ABOVE");
        console.log("hey man, congrats you have reached the Handler");
        res.status(200).send({ msg: "This is coming from controller (handler)" });
    } catch (err) {
        console.log("This is the error", err.message);
        res.status(500).send({ msg: "Error", error: err.message });
    }
};


const createUser = async function (req, res) {
    try {
        let data = req.body;
        let savedData = await UserModel.create(data);
        res.status(201).send({ msg: savedData });
    } catch (err) {
        console.log("This is the error", err.message);
        res.status(500).send({ msg: "Error", error: err.message });
    }
};

const getUsersData = async function (req, res) {
    try {
        let allUsers = await UserModel.find();
        res.status(200).send({ msg: allUsers });
    } catch (err) {
        console.log("This is the error", err.message);
        res.status(500).send({ msg: "Error", error: err.message });
    }
};


//Destructuring
module.exports = { createUser, getUsersData, basicCode };

