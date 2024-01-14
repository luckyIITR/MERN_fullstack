import {
  create_post,
  getpostbyid,
  deletepost,
  likepost,
  unlikepost,
  commentonpost,
  deletecomment,
  getallpost,
} from "../../controllers/postController.js";
import express from "express";
import authmiddleware from "../../middleware/auth.js";
import checkObjectId from "../../middleware/checkObjectId.js";

import { check } from "express-validator";

const router = express.Router();

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  "/",
  authmiddleware,
  check("text", "Text is required").notEmpty(),
  create_post
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', authmiddleware, getallpost);

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get("/:id", authmiddleware, checkObjectId("id"), getpostbyid);

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", [authmiddleware, checkObjectId("id")], deletepost);

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/like/:id", authmiddleware, checkObjectId("id"), likepost);

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put("/unlike/:id", authmiddleware, checkObjectId("id"), unlikepost);

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  "/comment/:id",
  authmiddleware,
  checkObjectId("id"),
  check("text", "Text is required").notEmpty(),
  commentonpost
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", authmiddleware, deletecomment);

export default router;
