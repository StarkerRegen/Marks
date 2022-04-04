import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // user exist or not
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    // password correct or not
    const isPasswdCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswdCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    // token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "viima",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    // user exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist." });
    // password match or not
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords should be same." });
    const hashedPasswd = await bcrypt.hash(password, 12);
    const result = await User.create({
      name,
      email,
      password: hashedPasswd,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "viima", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error.message);
  }
};
