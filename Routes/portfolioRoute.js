const express = require("express");
// const { sendEmailController } = require("../Controllers/portfolioContoller");
const sendEmailController = require("../Controllers/portfolioContoller");

//router object
const router = express.Router();
router.get("/all", (req, res) => {
  res.json({
    msg: "heelo ",
  });
});
//routes
router.post("/sendEmail", sendEmailController);

// /export
module.exports = router;
