const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController");
const reviewsController = require("../controllers/reviewsController")

const BookMiddleware=require("../middlewares/bookMiddleware")


router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

router.post("/books", bookController.createBook);
router.get("/books", bookController.getBook);

router.get("/books/:bookId", bookController.getBookByParams);
router.put("/books/:bookId", bookController.updateBook);
router.delete("/books/:bookId", bookController.deleteBook);

router.post("/books/:bookId/review",reviewsController.createReviews);





module.exports = router;
