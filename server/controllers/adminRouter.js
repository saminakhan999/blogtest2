require("dotenv").config();

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");

// ----------Test-------------
// router.get("/", async (req, res) => {
//   const admin = await Admin.all;
//   res.json(admin);
// });

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(req.body.password, salt);
    await Admin.create({ ...req.body, password_digest: hashed });
    res.status(201).json({ msg: "Admin created." });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findByUsername(req.body.username);
    if (!admin) {
      throw new Error("No admin with given username");
    }
    const authed = bcrypt.compareSync(req.body.password, admin.password_digest);
    if (!!authed) {
      const payload = { username: admin.username };
      const sendToken = (err, token) => {
        if (err) {
          throw new Error("Error in token generation");
        }
        res.status(200).json({
          success: true,
          token: "Bearer " + token,
        });
      };
      jwt.sign(payload, process.env.SECRET, { expiresIn: 60 }, sendToken);
    } else {
      throw new Error("Admin could not be authenticated");
    }
  } catch (err) {
    res.status(401).json({ err: err });
  }
});

module.exports = router;
