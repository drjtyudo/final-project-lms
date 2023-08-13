const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../helper/relation.js");
const { v4: uuidv4 } = require("uuid");

exports.getUsers = async (req, res) => {
  try {
    const response = await Users.findAll();
    if (response.length === 0) {
      return res.json({ msg: "Data user kosong" });
    }
    res.status(200).json({ msg: "success get all user", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.userRegister = async (req, res) => {
  const {
    fullname,
    email,
    password,
    confirmPassword,
    nomor_telp,
    tggl_lahir,
    negara,
    domisili,
  } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Konfirmasi password tidak sesuai" });
    }
    const existingEmail = await Users.findOne({
      where: { email: req.body.email },
    });
    if (existingEmail) {
      return res.status(400).json({ msg: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const fullUUID = uuidv4();

    const shortID = fullUUID.slice(0, 4);
    const userId = `uid-${shortID}`;

    const newUser = await Users.create({
      id_user: userId,
      fullname,
      email,
      password: hashedPassword,
      nomor_telp,
      tggl_lahir,
      negara,
      domisili,
    });

    res.status(201).json({ msg: "Pengguna berhasil terdaftar.", newUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    if (user.length === 0) {
      return res.status(404).json({ msg: "Email tidak ditemukan" });
    }

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.status(400).json({ msg: "Password salah!" });
    }

    const userId = user[0].id_user;
    const email = user[0].email;
    //   const username = user[0].username;
    const accessToken = jwt.sign(
      { userId, email },
      process.env.SECRET_ACCESS_TOKEN,
      {
        expiresIn: "2m",
      }
    );
    const refreshToken = jwt.sign(
      { userId, email },
      process.env.SECRET_REFRESH_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id_user: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });

    req.user = { userId, email };

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.checkLogin = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await Users.findOne({
      where: {
        id_user: userId,
      },
      attributes: ["id_user", "fullname", "email"],
    });

    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.userLogout = async (req, res) => {
  try {
    const userId = req.user.userId;
    await Users.update(
      { refresh_token: null },
      {
        where: {
          id_user: userId,
        },
      }
    );

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ msg: "Anda telah Logout" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { fullname, email, nomor_telp, tggl_lahir, negara, domisili } =
      req.body;

    const existingUser = await Users.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({ msg: "User tidak ditemukan." });
    }

    existingUser.fullname = fullname;
    existingUser.email = email;
    existingUser.nomor_telp = nomor_telp;
    existingUser.tggl_lahir = tggl_lahir;
    existingUser.negara = negara;
    existingUser.domisili = domisili;

    await existingUser.save();

    res
      .status(200)
      .json({ msg: "User berhasil diperbarui.", user: existingUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const response = await Users.findAll({
      where: { id_user: req.params.userId },
    });
    if (response.length === 0) {
      return res.status(404).json({ msg: "user tidak ditemukan" });
    }
    res.status(200).json({ msg: "success", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
