const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ username, email, password: password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials email" });
    console.log(password);
    console.log(user.password);
    // const match = await bcrypt.compare(password, user.password);
    const match = () => password == user.password;

    if (!match) return res.status(401).json({ message: "Invalid credentials password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };
