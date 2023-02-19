const router = require("express").Router();
const User = require("../models/User");
const userController = require("../controllers/authController");

//register user
router.post("/register", userController.registerUser);

//login
router.post("/signin", userController.loginUser);

// router.get("/", (req, res) => {
//   res.send(" Hello Its auth route. ");
// });

module.exports = router;
