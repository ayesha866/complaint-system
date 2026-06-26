const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Protect routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "mysecretkey"
    );

    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid" });
  }
};

// Role-based access
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role?.toLowerCase();
    const allowedRoles = roles.map((r) => r.toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Not authorized for this role",
      });
    }

    next();
  };
};

module.exports = { protect, authorizeRoles };