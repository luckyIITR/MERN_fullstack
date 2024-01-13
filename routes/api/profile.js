import express from "express";
import authmiddleware from "../../middleware/auth.js";
import {
  getProfile,
  create_update_profile,
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

export default router;
