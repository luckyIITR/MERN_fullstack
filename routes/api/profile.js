import express from "express";
import authmiddleware from "../../middleware/auth.js";
import { check } from "express-validator";
import checkObjectId from "../../middleware/checkObjectId.js";

import {
  getProfile,
  create_update_profile,
  getallprofiles,
  getprofilebyid,
  deleteprofile,
  addexperience,
  deleteexperience,
  addeducation,
  deleteeducation,
  getuserrepo,
} from "../../controllers/profileController.js";

const router = express.Router();

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", authmiddleware, getProfile);

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  authmiddleware,
  check("status", "Status is required").notEmpty(),
  check("skills", "Skills is required").notEmpty(),
  create_update_profile
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", getallprofiles);

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", checkObjectId("user_id"), getprofilebyid);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", authmiddleware, deleteprofile);

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  "/experience",
  authmiddleware,
  check("title", "Title is required").notEmpty(),
  check("company", "Company is required").notEmpty(),
  check("from", "From date is required and needs to be from the past")
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  addexperience
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete("/experience/:exp_id", authmiddleware, deleteexperience);

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  "/education",
  authmiddleware,
  check("school", "School is required").notEmpty(),
  check("degree", "Degree is required").notEmpty(),
  check("fieldofstudy", "Field of study is required").notEmpty(),
  check("from", "From date is required and needs to be from the past")
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  addeducation
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete("/education/:edu_id", authmiddleware, deleteeducation);

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get("/github/:username", getuserrepo);

export default router;
