require("dotenv").config();

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { verifyToken } = require("../middleware/auth");
const Admin = require("../models/admin");

// ----------Test-------------
router.get("/", async (req, res) => {
  const admin = await Admin.all;
  res.json(admin);
});

router.get("/:username", async (req, res) => {
  try {
    const admin = await Admin.findByUsername(req.params.username);
    res.json(admin);
  } catch (err) {
    res.status(404).json({ err: "No admin wit given username" });
  }
});

router.post("/register", verifyToken, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(req.body.password, salt);
    await Admin.create({
      username: req.body.username.toLowerCase(),
      password: hashed,
    });
    res
      .status(201)
      .json({ msg: `Admin created. Username: ${req.body.username}` });
  } catch (err) {
    res.status(500).json({ err: "Failed registration" });
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
      jwt.sign(payload, process.env.SECRET, { expiresIn: 86400 }, sendToken);
    } else {
      throw new Error("Admin could not be authenticated");
    }
  } catch (err) {
    res.status(401).json({ err: err });
  }
});

router.patch("/newpassword", verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findByUsername(req.body.username.toLowerCase());
    if (!admin) {
      throw new Error("No admin with given username");
    }
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(req.body.newPassword, salt);
    await admin.update(hashed);
    res.status(200).json({ msg: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ err: "Error updating password" });
  }
});

// Add verifyOG as a callback to check admin is of appropriate rank
router.delete("/abolish/:username", verifyToken, async (req, res) => {
  try {
    const badmin = await Admin.findByUsername(
      req.params.username.toLowerCase()
    );
    await badmin.destroy();
    res
      .status(204)
      .json({ msg: `${req.params.username.toLowerCase()} removed as admin` });
  } catch (err) {
    res.status(500).json({
      err: `No admin with username ${req.params.username.toLowerCase()}`,
    });
  }
});

module.exports = router;
