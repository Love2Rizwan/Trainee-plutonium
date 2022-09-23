const bookModel = require('../Models/bookModel');
const mongoose = require('mongoose');
const validator = require('validator');

// create book
const createBook = async function (req, res) {
          try {
                    let { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = req.body;
                    // check body present or not
                    if (Object.keys(req.body).length === 0) {
                              return res.status(400).send({ status: false, message: "In req body data must be present" });
                    }
                    // title validation
                    if (!title) {
                              return res.status(400).send({ status: false, message: "title is required field" });
                    }
                    if (! /^\w[A-Za-z0-9\s\-_,\.;:()]+$/.test(title)) {
                              return res.status(400).send({ status: false, message: "title is not in valid format" });
                    }
                    if (!excerpt) {
                              return res.status(400).send({ status: false, message: "expert key is required field" });
                    }
                    if (! /^\w[a-zA-Z\.]+/.test(excerpt)) {
                              return res.status(400).send({ status: false, message: " excerpt text is invalid it must be alphabet" });
                    }
                    if (!userId) {
                              res.status(400).send({ status: false, message: "userId must be present" });
                    }
                    if (!mongoose.isValidObjectId(userId)) {
                              return res.status(400).send({ status: false, message: "enter valid  userId " });
                    }
                    if (!ISBN) {
                              return res.status(400).send({ status: false, message: "ISBN is required field " });

                    }
                    if (! /\x20*(?=.{17}$)97(?:8|9)([ -])\d{1,5}\1\d{1,7}\1\d{1,6}\1\d$/.test(ISBN)) {
                              return res.status(400).send({ status: false, message: "plz type Isbn in valid format " });
                    }
                    if (!category) {
                              return res.status(400).send({ status: false, message: "category must be present" });
                    }
                    if (! /^\w[a-zA-Z\.]+/.test(category)) {
                              return res.status(400).send({ status: false, message: "category in valid format" });
                    }
                    if (!subcategory) {
                              return res.status(400).send({ status: false, message: "subcategory is required field" });
                    }
                    if (!/^\w[a-zA-Z\.]+/.test(subcategory)) {
                              return res.status.send({ status: false, message: "type subcategory in valid format" });
                    }
                    if (!releasedAt) {
                              return res.status(400).send({ status: false, message: "releasedAt filed is required " });
                    }
                    if (!validator.isDate(releasedAt)) {
                              return res.status(400).send({ status: false, message: " releasedAt  Invalid format" });
                    }
                    const uniqueTitle = await bookModel.findOne({ title });
                    if (uniqueTitle) {
                              return res.status(400).send({ status: false, message: "title is alreday exist" });
                    }
                    const uniqueIsbn = await bookModel.findOne({ ISBN });
                    if (uniqueIsbn) {
                              return res.status(400).send({ status: false, message: "ISBN is alreday exist" });
                    }
                    const saveData = await bookModel.create(req.body);
                    return res.status(201).send({ status: true, message:'success', data: saveData });
          } catch (error) {
                    console.log(error);
                    return res.status(500).send({ status: true, massage: error.massage });
          }
};





// ======================= PUT /books/:bookId  ===========================

// const updateBook = async function (req ,res){
//           let bookId = req.params.bookId;

//           let book = await bookModel.findById(bookId)
//           if(! book || book.isDeleted ==true){
//                     return res.status(404).send({status: false , message: "Book not found"})
//           }
//           if(req.token.bookId !== book.userId)

//           let { title,excerpt,release date ,ISBN } =req.body

//           if(title){
//                     return res.status(200).send({status: true})
//           }

// 
// DELETE /books/:bookId
// Check if the bookId exists and is not deleted. If it does,
//  mark it deleted and return an HTTP status 200 with a response body with status and message.
// If the book document doesn't exist then return an HTTP status of 404 with a body like this
const deleteBookById = async function(req,res){
    try{
    let bookId = req.params.bookId
    if(!mongoose.isValidObjectId(bookId)){
        return res.status(400).send({status:false,message:"bookId is not valid format"})
    }
    let book = await bookModel.findOne({bookId:bookId,isDeleted:false})
    if(!book){
        return res.status(400).send({status:false,message:"bookId is not matching with any existing bookId"})
    }
    let deleteBook = await bookModel.findOneAndUpdate({_id:bookId,isDeleted:false},
        {$set:{isDeleted:true,deletedAt:new Date()}
    }
        )
        if(deleteBook){
        return res.status(200).send({status:true,message:"successfully deleted"})
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }

}
module.exports.createBook = createBook
module.exports.deleteBookById=deleteBookById




