//user register controller

exports.registerUser = async (req, res) => {
  async (req, res) => {
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
  };
};

//User Login controller
exports.loginUser = async (req, res) => {
  const { email } = req.body;
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
};
