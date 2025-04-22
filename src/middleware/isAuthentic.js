const jwt = require("jsonwebtoken");
const register = require("../models/registers"); // adjust path

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/loginsignup");

    // Verify token
    const verified = jwt.verify(token, "kjrvgkrewgfuwgfvjkjewqwgfueqgf");

    // Find user with this token
    const user = await register.findOne({ _id: verified._id, "tokens.token": token }).lean();
    if (!user) return res.redirect("/loginsignup");

    req.user = user; // Attach full user object
    req.token = token;
    next();
  } catch (err) {
    console.log("Auth error:", err.message);
    res.redirect("/loginsignup");
  }
};

module.exports = isAuth;