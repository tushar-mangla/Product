const express = require("express");
const router = express.Router();

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../../middleware/middleware");

const User = require("../../models/User");
const Post = require("../../models/Post");

//create post
router.post("/", checkAuthenticated, async (req, res) => {
  const { img } = req.body;
  try {
    if (!img) {
      return res.status(400).send("please give all input fields");
    }

    const data = await new Post({
      img,
      userId: req.user,
    });

    // console.log(data._id.toString());

    const saveData = await data.save();
    const myId = await User.findById(req.user._id.toString());

    await myId.updateOne({
      $push: {
        post: {
          id: data._id.toString(),
          img: data.img,
          likes: data.likes.length,
        },
      },
    });

    res.status(200).json(saveData);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get a post
router.get("/", checkAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

//update a post
router.put("/:id", checkAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post.userId.toString());
    // console.log(req.user._id.toString());
    if (post.userId.toString() === req.user._id.toString()) {
      await post.updateOne({ $set: { img: req.body.img } });
      res.status(200).send("updated post");
    } else {
      res.status(400).send("you can update only your own post");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

//delete post
router.delete("/:id", checkAuthenticated, async (req, res) => {
  const currentPost = await Post.findById(req.params.id);
  const myId = await User.findById(currentPost.userId);
  console.log(currentPost);
  // console.log(req.user._id);
  try {
    if (currentPost.userId.toString() === req.user._id.toString()) {
      await Post.deleteOne(currentPost);
      await User.updateOne(
        { id: currentPost.userId, "post.id": req.params.id.toString() },
        { $pull: { post: { id: req.params.id } } }
      );

      let totalLikes = myId.post.reduce((acc, { likes }) => {
        return acc + likes;
      }, 0);

      // console.log(totalLikes);

      await myId.updateOne({
        $set: { likes: totalLikes - currentPost.likes.length },
      });
      res.status(200).send("currentPost has been deleted successfully");
    } else {
      res.status(400).send("you can delete only your currentPost");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

//like post
router.put("/:id/like", checkAuthenticated, async (req, res) => {
  try {
    const currentPost = await Post.findById(req.params.id);
    const myId = await User.findById(currentPost.userId);

    console.log(myId);
    // console.log(req.user._id);

    const op = myId.post.find((ob) => ob.id === req.params.id);
    // console.log(op.likes);
    // console.log(
    //   `current post likes are ${op.likes} and total likes are ${post.likes + 1}`
    // );
    // console.log(op);
    // console.log(typeof myId.post);

    if (!currentPost.likes.includes(req.user._id)) {
      await currentPost.updateOne({ $push: { likes: req.user._id } });
      // await op.updateOne({ $set: { likes: op.likes + 1 } });
      // await JSON.stringify(db.myId.post).updateOne(
      //   { id: req.params.id },
      //   { $set: { likes: 1 } }
      // );
      // op.likes += 1;

      //update likes of every post in post field of User schema
      await User.updateOne(
        { id: currentPost.userId, "post.id": req.params.id.toString() },
        { $set: { "post.$.likes": currentPost.likes.length + 1 } }
      );

      let totalLikes = myId.post.reduce((acc, { likes }) => {
        return acc + likes;
      }, 0);

      console.log(totalLikes);

      await myId.updateOne({ $set: { likes: totalLikes + 1 } });

      // console.log(post.likes.length + 1);

      // await myId.updateOne({
      //   $set: { likes: Number(op.likes) + Number(myId.likes) },
      // });

      res.status(200).json("otherperson post => like successfull");
    } else {
      res.status(400).send("already like");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

//unlike post
router.put("/:id/unlike", checkAuthenticated, async (req, res) => {
  try {
    const currentPost = await Post.findById(req.params.id);
    const myId = await User.findById(currentPost.userId);
    if (currentPost.likes.includes(req.user._id)) {
      await currentPost.updateOne({ $pull: { likes: req.user._id } });

      await User.updateOne(
        { id: currentPost.userId, "post.id": req.params.id.toString() },
        { $set: { "post.$.likes": currentPost.likes.length - 1 } }
      );

      let totalLikes = myId.post.reduce((acc, { likes }) => {
        return acc + likes;
      }, 0);

      console.log(totalLikes);

      await myId.updateOne({ $set: { likes: totalLikes - 1 } });

      res.status(200).json("otherperson post => dislike successfull");
    } else {
      res.status(400).send("already dislike");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// router.get("/", (req, res) => {
//   res.send("Posts route");
// });

module.exports = router;
