const BookModel = require("../models/bookModel");


const createBook = async function (req, res) {
    try {
        let data = req.body;
        console.log(data);
        if (Object.keys(data).length != 0) {
            let savedData = await BookModel.create(data);
            res.status(201).send({ msg: savedData });
        }
        else res.status(400).send({ msg: "BAD REQUEST" });
    }
    catch (err) {
        console.log("This is the error :", err.message);
        res.status(500).send({ msg: "Error", error: err.message });
    }
};


const getBooksData = async function (req, res) {
    try {
        let allBooks = await BookModel.find({ authorName: "HO" });
        console.log(allBooks);
        if (allBooks.length > 0) res.send({ msg: allBooks, condition: true });

        else res.status(404).send({ msg: "No books found", condition: false });
    } catch (err) {
        console.log("This is the error", err.message);
        res.status(500).send({ msg: "Error", error: err.message });
    }
};


const updateBooks = async function (req, res) {
    try {
        let data = req.body; // {sales: "1200"}
        let allBooks = await BookModel.findOneAndUpdate(
            { authorName: "ABC" }, //condition
            { $set: data }, //update in data
            { new: true, upsert: true } ,
        );
        res.status(200).send({ msg: allBooks });
    } catch (err) {
        console.log("This is the error", err.message);
        res.status(500).send({ msg: "Error", error: err.message });
    }
};

const deleteBooks = async function (req, res) {
    try {    // let data = req.body 
        let allBooks = await BookModel.updateMany(
            { authorName: "FI" }, //condition
            { $set: { isDeleted: true } }, //update in data
            { new: true } ,
        );
        res.status(200).send({ msg: allBooks });
    } catch (err) {
        console.log("This is the error", err.message);
        res.status(500).send({ msg: "Error", error: err.message });
    }
};



const totalSalesPerAuthor = async function (req, res) {
    // let data = req.body 
    try {
        let allAuthorSales = await BookModel.aggregate(
            [
                { $group: { _id: "$authorName", totalNumberOfSales: { $sum: "$sales" } } },
                { $sort: { totalNumberOfSales: -1 } }
            ]
        );
        res.status(200).send({ msg: allAuthorSales });
    } catch (err) {
        console.log("This is the error", err.message);
        res.status(500).send({ msg: "Error", error: err.message });
    }
};



//Destructuring
module.exports = { createBook, getBooksData, updateBooks, deleteBooks, totalSalesPerAuthor };

