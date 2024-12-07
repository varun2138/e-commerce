import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  generateTokens,
  storeRefreshToken,
  setCookies,
} from "../utils/tokens.js";
import redis from "../lib/redis.js";

const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }

    const user = await User.create({
      email,
      name,
      password,
    });
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while creating user  !!! ${error.message}` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);
      return res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        message: "user logged In successfully",
      });
    } else {
      return res.status(401).json({ message: "invalid email or password" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while logging out !!! ${error.message}` });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
      await redis.del(`refresh_token:${decoded.userId}`);
      //   console.log(decoded.userId);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ messagge: "logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while logging out !!! ${error.message}` });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: "invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    res.status(500).json({ message: `Server Error !!! ${error.message}` });
  }
};

const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export { signup, login, logout, refreshAccessToken, getProfile };
