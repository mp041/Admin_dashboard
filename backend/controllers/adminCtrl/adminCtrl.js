require("dotenv").config();
const User = require("../../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminCtrl = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      // console.log(firstName, lastName, email, password)
      const user = await User.findOne({ email });
      console.log("helllow  ");
      if (user) {
        return res.status(400).json({ message: "Admin already registered" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password is at least 6 characters" });
      }

      //Password encrypt
      // const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        username: Math.random().toString(),
        role : 'admin'
      });
      await newUser.save();
      // console.log("tokensssssss");

      //create jwt
      // const accessToken = createAccessToken({ id: newUser._id });
      // console.log(accessToken, "accessToken");
      // const refreshtoken = createRefreshToken({ id: newUser._id });
      // console.log(accessToken, refreshtoken, "tokensss");

      // res.cookie("refreshtoken", refreshtoken, {
      //   httpOnly: true,
      //   path: "/user/refresh_token",
      // });

      res.status(201).json({ message: "Registration successfully", newUser });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

      // const isMatch = await bcrypt.compare(password, user.password);
      if (user) {
        if (user.authentication(password)) {
          const token = jwt.sign({ _id: user._id , role : user.role }, process.env.TOKEN_SECRET, {
            expiresIn: "1h",
          });

          const { _id,firstName, lastName, email,role,fullName } = user;

          res.cookie('token',token,{expiresIn: "1h"})
          res
            .status(200)
            .json({ message: "Login successfully",token, user:{_id,firstName,lastName,email,role,fullName} });
        } else {
            return res.status(400).json({ message: "Invalid credentials" });

        }
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // const accessToken = createAccessToken({ id: user._id });
      // const refreshtoken = createRefreshToken({ id: user._id });
      // console.log(accessToken, refreshtoken, "tokensss");

      // res.cookie("refreshtoken", refreshtoken, {
      //   httpOnly: true,
      //   path: "/user/refresh_token",
      // });
      // console.log(req.cookies, "cookie");
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },


  logout : (req,res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout Complete Successfully' });
  }
}

module.exports = adminCtrl;
