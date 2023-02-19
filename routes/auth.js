const router = require("express").Router();
const User = require("../models/User");

//register user
router.post("/register", async (req, res) => {
  console.log("hit");
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const user = await newUser.save();
    const { password, createdAt, ...other } = user._doc;
    res.status(200).json({ user: other });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//login
router.post("/signin", async (req, res) => {
  const { email } = req.body;
  console.log("hit");
  try {
    if (!email || !req.body.password) {
      return res.status(400).send("Please Enter Email and Password");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password." });
    }

    const isPasswordMatch = await user.comparePassword(req.body.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Email or Password." });
    }

    const { password, createdAt, ...other } = user._doc;
    res.status(200).json({
      message: "login Success",
      user: other,
    });
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
});

router.get("/", (req, res) => {
  res.send(" Hello Its auth route. ");
});

module.exports = router;
