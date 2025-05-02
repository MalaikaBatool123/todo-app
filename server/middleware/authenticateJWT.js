import jwt from "jsonwebtoken";
import { userModel } from "../postgres/postgres.js";
// imprt {userModel}
const authenticateJWT = async (req, res, next) => {
    console.log("in auth");
  const authHeader = req.headers.authorization;
  console.log("authHeader: ", authHeader);
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    console.log("TOKEN: ", token);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ where: { email: decoded.email } });
      if (!user) {
        return res.status(403).json({ message: "Invalid token" });
      }
      console.log("decoded", decoded);
      req.user = user;

      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Token required" });
  }
};

export default authenticateJWT;