import express from "express";
import { Login, Register } from "../../controllers/authController.js";
import { check } from "express-validator";

const router = express.Router();

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/login",
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  Login
);

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/register",
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  Register
);

export default router;
