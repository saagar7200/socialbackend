const router = require("express").Router();
const User = require("../models/User");
const userController = require("../controllers/auth");

router.get("/", (req, res) => {
  res.send("Welcome to user Homepage");
});
//register user
router.post("/register", userController.registerUser);

//login
router.post("/signin", userController.loginUser);

module.exports = router;
