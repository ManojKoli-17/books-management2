const BookModel = require("../models/bookModel");
const UserModel = require("../models/userModel");
const { loginUser } = require("./userController");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};
const isValidReqBody = function (data) {
  return Object.keys(data).length > 0;
};

const createBook = async function (req, res) {
  try {
    let data = req.body;

    data["releasedAt"] = new Date();

    if (!isValidReqBody(data)) {
      res
        .status(400)
        .send({ status: false, message: "Please provide Books details" });
      return;
    }

    if (!isValid(data.title)) {
      res.status(400).send({ status: false, message: "Title is required" });
      return;
    }

    if (!isValid(data.excerpt)) {
      res.status(400).send({ status: false, message: "Excerpt is required" });
      return;
    }

    if (!isValid(data.userId)) {
      res.status(400).send({ status: false, message: "UserId is required" });
      return;
    }
    if (!isValid(data.ISBN)) {
      res.status(400).send({ status: false, message: "ISBN is required" });
      return;
    }
    if (!isValid(data.category)) {
      res.status(400).send({ status: false, message: "Category is required" });
      return;
    }
    if (!isValid(data.subcategory)) {
      res
        .status(400)
        .send({ status: false, message: "Subcategory is required" });
      return;
    }

    let isTitlePresent = await BookModel.findOne({ title: data.title });
    if (isTitlePresent) {
      return res
        .status(400)
        .send({ status: false, message: "Book Title is already exist" });
    }
    if (data.reviews < 0 || data.reviews > 5) {
      return res
        .status(400)
        .send({ status: false, message: "Plz provide 0 to 5 Review" });
    }

    let isUserIdPresent = await UserModel.findOne({ _id: data.userId });
    if (!isUserIdPresent) {
      return res
        .status(404)
        .send({ status: false, message: "User Id is not found" });
    }

    let isISBNPresent = await BookModel.findOne({ ISBN: data.ISBN });
    if (isISBNPresent) {
      return res
        .status(400)
        .send({ status: false, message: "ISBN is already exist" });
    }

    let bookCreated = await BookModel.create(data);
    res
      .status(201)
      .send({ status: true, message: "Success", data: bookCreated });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { createBook };
