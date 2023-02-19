const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user
exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err.message);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({
        message: "Account has been updated.",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    return res
      .status(403)
      .json({ message: "You can update only your account!" });
  }
};

//delete single user

exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
      }
      res.status(200).json({
        message: "Account has been Deleted.",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    return res
      .status(403)
      .json({ message: "You can Delete only your account!" });
  }
};

//get single user

exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
};

//follow user

exports.folllowUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    return res.status(500).json({ message: "You can not follow yourself." });
  }
  try {
    const user = await User.findById(req.params.id).select("-password");
    const currentUser = await User.findById(req.body.userId).select(
      "-password"
    );

    if (currentUser.followings.includes(req.params.id)) {
      return res
        .status(500)
        .json({ message: "You already  follow this user." });
    }
    await user.updateOne({ $push: { followers: req.body.userId } });
    await currentUser.updateOne({ $push: { followings: req.params.id } });
    res.status(200).json({ message: `User has been followed.` });
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
};

//unfollow user

exports.unfollowUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    return res.status(500).json({ message: "You can not unfollow yourself." });
  }
  try {
    const user = await User.findById(req.params.id).select("-password");
    const currentUser = await User.findById(req.body.userId).select(
      "-password"
    );

    if (!currentUser.followings.includes(req.params.id)) {
      return res
        .status(500)
        .json({ message: `You are not following ${user.username}.` });
    }
    await user.updateOne({ $pull: { followers: req.body.userId } });
    await currentUser.updateOne({ $pull: { followings: req.params.id } });
    res
      .status(200)
      .json({ message: `You has been unfollowed ${user.username}.` });
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
};
