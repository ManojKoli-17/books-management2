const ReviewModel= require("../models/reviewModel")
const BookModel = require("../models/bookModel");


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };

const isValidReqBody = function (data) {
    return Object.keys(data).length > 0;
};

const createReviews = async function(req, res){
    try {
        let data=req.body
        let bookId=req.params.bookId

        if (!isValidReqBody(data)) {
            res.status(400)
              .send({ status: false, message: "Please provide Reviews details" });
            return;
          }

        if (!isValid(data.bookId)) {
            res.status(400).send({ status: false, message: "BookId is required" });
            return;
        }        
        if (!isValid(data.reviewedBy)) {
            res.status(400).send({ status: false, message: "Reviewer's name is required" });
            return;
        }        
        if (!isValid(data.reviewedAt)) {
            res.status(400).send({ status: false, message: "Review Date is required" });
            return;
        }        
        if (!isValid(data.rating)) {
            res.status(400).send({ status: false, message: "Rating Date is required" });
            return;
        }
        
        if (!(/^[0-9a-fA-F]{24}$/.test(bookId) && /^[0-9a-fA-F]{24}$/.test(data.bookId))) {
            return res
              .status(400)
              .send({ status: false, message: "please provide valid BookId" });
          }
        
        if(data.rating < 1 || data.rating > 5){
            return res
        .status(400)
        .send({ status: false, message: "Rating should be 1 to 5" });
        }
        let paramsBookId=await BookModel.findOne({_id:bookId, isDeleted:false})

        let bodyBookId=await BookModel.findOne({_id:data.bookId, isDeleted:false})

        if(bookId != data.bookId){
            return res.status(400).send({status:false, message:"Plz provide similar BookId's in param and body"})
        }
        if(!(paramsBookId && bodyBookId)){
            return res.status(404).send({status:false, message:"Book data not found with this BookId"})
        }

        let reviewsData=await ReviewModel.create(data)
        res.status(201).send({status:true, message:"Reviews data created successfully", data:reviewsData})

    } catch (err) {
        res.status(500).send({status:false, message:err.message})
    }
}

module.exports={createReviews}