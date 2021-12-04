const express = require("express");
const router = express.Router();
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../../middleware/middleware");
const Post = require("../../models/Post");
const User = require("../../models/User");

//get a user
router.get("/:id", checkAuthenticated, async (req, res) => {
  try {
    // User.findOne({ _id: req.params.id }).select();
    const profile = await User.findById(req.params.id);
    // // console.log(profile);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: "there is not profile for this user" });
    }

    // // console.log(profile);
    // // User.findById(req.params.id, async (req, res) => {
    // //   if (req) {
    // //     console.log("cdsvsvsfd ddfdfdfdfdf");
    // //     console.log(req);
    // //   } else {
    // //     // console.log("cdsvsvsfd ddfdfdfdfdvffffffffffffffffffffff");

    // //     console.log(res.followers);
    // //   }
    // // });

    // // if (!profile) {
    // //   return res
    // //     .status(400)
    // //     .json({ message1: "There is no profile for this user" });
    // // }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// update a user
router.put("/:id", checkAuthenticated, async (req, res) => {
  if (req.user._id.toString() === req.params.id) {
    // if (req.body.password) {
    //   try {
    //   } catch (e) {}
    // }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      return res.status(200).json(user);
    } catch (e) {
      return res.status(500).json(e);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
});

// delete a user
router.delete("/:id", checkAuthenticated, async (req, res) => {
  if (req.body._id === req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      return res.status(200).json(user);
    } catch (e) {
      return res.status(500).json(e);
    }
  } else {
    return res.status(403).json("You can delete only your account");
  }
});

//follow a user
router.put("/:id/follow", checkAuthenticated, async (req, res) => {
  if (req.body._id.toString() !== req.params.id) {
    console.log(req.params.id);
    console.log(req.body._id.toString());

    try {
      // User.findByIdAndUpdate(req.params.id, {
      //   $push: { followers: req.user._id },
      // });
      const otherPerson = await User.findById(req.params.id);
      const mySelf = await User.findById(req.body._id.toString());

      if (!otherPerson.followers.includes(req.body._id.toString())) {
        await otherPerson.updateOne({
          $push: { followers: req.body._id.toString() },
        });
        await mySelf.updateOne({ $push: { followings: req.params.id } });
        res.status(200).send("followed successfull");
      } else {
        res.status(403).json("Already follow this person");
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});

//unfollow a user
router.put("/:id/unfollow", checkAuthenticated, async (req, res) => {
  if (req.body._id.toString() !== req.params.id) {
    try {
      const otherPerson = await User.findById(req.params.id);
      const mySelf = await User.findById(req.body._id.toString());

      if (otherPerson.followers.includes(req.body._id.toString())) {
        await otherPerson.updateOne({
          $pull: { followers: req.body._id.toString() },
        });
        await mySelf.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).send("Unfollow Successfull");
      } else {
        res.status(500).json("you do not follow this person");
      }
    } catch (e) {
      res.status(400).json("can't unfollow your self");
    }
  } else {
  }
});

module.exports = router;
