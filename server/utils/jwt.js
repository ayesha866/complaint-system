const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // payload
    process.env.JWT_SECRET || "mysecretkey", // secret key
    { expiresIn:  process.env.JWT_EXPIRE || "1d" } // expires in 1 day
  );
};

module.exports = generateToken;