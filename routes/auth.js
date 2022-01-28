const { Router } = require("express");
const { check } = require("express-validator");

const { signup, login } = require("../controllers/auth");
const validateFields = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/signin",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  signup
);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
