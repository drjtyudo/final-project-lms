const { Pelatihan, Kategori, Rating, Views } = require("../helper/relation");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

exports.getPelatihan = async (req, res) => {
  try {
    const response = await Pelatihan.findAll({
      include: [
        {
          model: Kategori,
          as: "Kategoris",
          attributes: [
            "id",
            "kategori",
            "deskripsi",
            "image_logo",
            "url_image",
          ],
        },
        {
          model: Rating,
          as: "Ratings",
          attributes: ["id", "rating", "id_user"],
        },
        {
          model: Views,
          as: "Views",
          attributes: ["view"],
        },
      ],
    });


    const ratings = response.Ratings; // Ambil rating
    const ratingsCount = ratings.length; // pangjang rating atau jumlah rating

    // Cek apakah ada?  jika tidak munculkan 0

    // if (ratingsCount === 0) {
    //   res.status(200).json({
    //     msg: "ok",
    //     pelatihan: response,
    //     averageRating: 0,
    //   }); // Tidak ada rating ✨ haduh
    //   return;
    // }

    let roundedAverage = 0 
    if (ratingsCount !== 0) {
      const totalRatings = ratings.reduce((sum, rating) => sum + parseFloat(rating.rating), 0); // hitung jumlah rata-rata rating
      const averageRating = totalRatings / ratingsCount;
      roundedAverage = parseFloat(averageRating.toFixed(1));
    }


    const view = response.Views.length
    let resultV
    if (view === 0) {
       resultV = 0
    }
 
    res.status(200).json({
      msg: "ok",
      pelatihan: response,
      averageRating: roundedAverage,
      view : resultV
    });
    
  } catch (error) {
    console.log(error.message);
  }
};

exports.getPelatihanById = async (req, res) => {
  try {
    const response = await Pelatihan.findOne({
      include: [
        {
          model: Kategori,
          as: "Kategoris",
          attributes: [
            "id",
            "kategori",
            "deskripsi",
            "image_logo",
            "url_image",
          ],
        },
        {
          model: Rating,
          as: "Ratings",
          attributes: ["id", "rating", "id_user"],
        },
        {
          model: Views,
          as: "Views",
          attributes: ["view"],
        },
      ],
      where: {
        id: req.params.id,
      },
    });

    const ratings = response.Ratings; // Ambil rating
    const ratingsCount = ratings.length; // pangjang rating atau jumlah rating

    let roundedAverage = 0 
    if (ratingsCount !== 0) {
      const totalRatings = ratings.reduce((sum, rating) => sum + parseFloat(rating.rating), 0); // hitung jumlah rata-rata rating
      const averageRating = totalRatings / ratingsCount;
      roundedAverage = parseFloat(averageRating.toFixed(1));
    }


    const view = response.Views.length
    let resultV
    if (view === 0) {
       resultV = 0
    }
 
    res.status(200).json({
      msg: "ok",
      pelatihan: response,
      averageRating: roundedAverage,
      view : resultV
    });
    
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


exports.createPelatihan = async (req, res) => {
  try {
    const {
      judul,
      deskripsi,
      harga,
      dibuatOleh,
      status,
      diterbitkan,
      level,
      masaLisensi,
    } = req.body;


    const imageFile = req.files.image;

    const imageTimestamp = Date.now();
    const imageExt = path.extname(imageFile.name);
    const imageRandomString = crypto.randomBytes(8).toString("hex");
    const imageFileName = `${imageTimestamp}-${imageRandomString}${imageExt}`;
    const imageUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/pelatihan-image/${imageFileName}`;
    const imagePath = `./public/assets/pelatihan-image/${imageFileName}`;

    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(imageExt.toLowerCase()))
      return res.status(422).json({ msg: "invalid image image" });

    const maxSize = 10000000;

    if (imageFile.size > maxSize) {
      return res.status(422).json({ msg: "tidak boleh melebihi 10mb" });
    }

    imageFile.mv(imagePath, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }

      const pelatihan = await Pelatihan.create({
        judul,
        deskripsi,
        harga,
        dibuat_oleh: dibuatOleh,
        status,
        diterbitkan,
        level,
        image: imageFileName,
        image_url: imageUrl,
        masa_lisensi: masaLisensi,
      });
      res.status(201).json({
        msg: "pelatihan berhasil dibuat",
        createdData: pelatihan,
      });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updatePelatihan = async (req, res) => {
  const {
    judul,
    deskripsi,
    harga,
    dibuatOleh,
    status,
    diterbitkan,
    level,
    masaLisensi,
  } = req.body;

  const pelatihan = await Pelatihan.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!pelatihan)
    return res.status(404).json({ msg: "pelatihan tidak ditemukan" });

  try {
    let imageFileName = pelatihan.image;
    let imageUrl = pelatihan.image_url;

    if (req.files && req.files.image) {
      const imageFile = req.files.image;

      const imageTimestamp = Date.now();
      const imageExt = path.extname(imageFile.name);
      const imageRandomString = crypto.randomBytes(8).toString("hex");
      imageFileName = `${imageTimestamp}-${imageRandomString}${imageExt}`;
      imageUrl = `${req.protocol}://${req.get(
        "host"
      )}/assets/pelatihan-image/${imageFileName}`;
      const imagePath = `./public/assets/pelatihan-image/${imageFileName}`;

      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(imageExt.toLowerCase()))
        return res.status(422).json({ msg: "invalid image image" });

      const maxSize = 10000000;

      if (imageFile.size > maxSize) {
        return res.status(422).json({ msg: "tidak boleh melebihi 10mb" });
      }

      // Hapus file lama jika ada
      if (pelatihan.image) {
        const filePath = path.join(
          __dirname,
          "../public/assets/pelatihan-image/",
          pelatihan.image
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      // simpan file ke direktori yang ditentukan
      imageFile.mv(imagePath, async (err) => {
        if (err) {
          return res.status(500).json({ msg: err.message });
        }
      });
    }

    await pelatihan.update({
      judul,
      deskripsi,
      harga,
      dibuat_oleh: dibuatOleh,
      status,
      diterbitkan,
      level,
      image: imageFileName,
      image_url: imageUrl,
      masa_lisensi: masaLisensi,
    });

    res
      .status(200)
      .json({ msg: "Pelatihan berhasil diperbarui", updatedData: pelatihan });
  } catch (error) {
    res.status(500).json({
      msg: "Terjadi kesalahan saat memperbarui pelatihan",
      error: error.message,
    });
    // sebaiknya jika error di tampilkan ke konsole
    // console.log(error.message)
  }
};

exports.deletePelatihan = async (req, res) => {
  try {
    const pelatihan = await Pelatihan.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!pelatihan) {
      return res.status(404).json({ msg: "pelatihan tidak ditemukan" });
    }

    // Hapus file lama jika ada
    if (pelatihan.image) {
      const filePath = path.join(
        __dirname,
        "../public/assets/pelatihan-image",
        pelatihan.image
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await pelatihan.destroy({
      where: {
        id: pelatihan.id,
      },
    });

    return res.status(200).json({ msg: "pelatihan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      msg: "Terjadi kesalahan saat menghapus pelatihan",
      error: error.message,
    });
  }
};