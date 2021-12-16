const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "am0nk!";

//ROUTE:1 create a user using : POST '/api/auth/createuser'. No login required
router.post("/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const erorrs = validationResult(req);
    if (!erorrs.isEmpty()) {
    return res.status(400).json({ erorrs: erorrs.array() });
    }
    // check whether the same email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with same email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    }
    catch (error) {console.error(error.message);
      res.status(500).send("Internal error occured");
    }
  }
);

//ROUTE:2 Authenticate a user using : POST '/api/auth/login'. No login required
router.post("/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", `Password can't be blank`).exists(),
  ],
  async (req, res) => {
    let success=false

    const erorrs = validationResult(req);
    if (!erorrs.isEmpty()) {
      return res.status(400).json({ erorrs: erorrs.array() });
    }
    const { email, password } = req.body;

    try {
     // finding correct email
      let user = await User.findOne({ email });
      if (!user) {
        success=false
        return res.status(400).json({ error: "Sorry! Login with correct credentials" });
      }

      // comparing password for match
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false
        return res .status(400).json({success, error: "Sorry! Login with correct credentials" });
      }
      const data = {user: { id: user.id,}, };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, authtoken });
    }
    catch (error) {console.error(error.message);
     res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE:3 Get registered user using : POST '/api/auth/getuser'. login required
router.post("/getuser",fetchuser,async (req, res) => {
  try {
      userId=req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router;
