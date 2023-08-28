const { Users } = require("./relation");
const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user || user.length === 0) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESH_TOKEN,
      (err, decode) => {
        if (err) return res.sendStatus(403);
        const userId = user[0].id_user;
        const email = user[0].email;
        // const username = user[0].username;
        const accessToken = jwt.sign(
          { userId, email },
          process.env.SECRET_ACCESS_TOKEN,
          {
            expiresIn: "15s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
