const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.json({ msg: "Email sudah ada" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash
    });

    res.json({ msg: "Register berhasil", user });
  } catch (err) {
    res.json(err);
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.json({ msg: "User tidak ada" });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) {
      return res.json({ msg: "Password salah" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    res.json({
      msg: "Login berhasil",
      token
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};