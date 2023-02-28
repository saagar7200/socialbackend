const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// const { findById } = require("../models/User");
const userController = require("../controllers/userController");

// router.get("/", (req, res) => {
//   res.send("Welcome to user Homepage");
// });

//update user
router.put("/:id", userController.updateUser);

//delete user
router.delete("/:id", userController.deleteUser);

//get a user

router.get("/:id", userController.getSingleUser);

//follow
router.put("/:id/follow", userController.folllowUser);

//unfollow
router.put("/:id/unfollow", userController.unfollowUser);

module.exports = router;
