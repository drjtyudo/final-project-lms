const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decode) => {
    if (err) return res.status(403).json({msg : "Login first"});
    req.userId = decode.userId;
    next();
  });
};

// exports.authenticateToken = (req, res, next) => {
//   const token = req.cookies.accessToken;
//   if (!token) {
//     return res.status(401).json({ msg: "Akses token tidak ditemukan" });
//   }

//   jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
//     if (err) {
//       return res.status(403).json({ msg: "Akses token tidak valid" });
//     }
//     req.user = user;
//     next();
//   });
// };
