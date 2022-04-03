const jwt = require("jsonwebtoken");

const mid1 = async function (req, res, next) {
  try {
    //Authentication
    const token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(404)
        .send({ status: false, message: "token must be present" });
    }
  //Authorization
    var decodedToken = jwt.verify(token, "books-management");

    if(!decodedToken){
      res.status(400).send({status:false, message:"Invalid token"})
    }


    req.user = decodedToken.userId;

    next();

  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { mid1 };