const { KontenVideo } = require("../helper/relation.js");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

exports.getAllKontenVideo = async (req, res) => {
  try {
    const response = await KontenVideo.findAll();

    res.status(200).json({ msg: "ok", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getKontenVideoById = async (req, res) => {
  try {
    const response = await KontenVideo.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ msg: "ok", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createKontenVideo = async (req, res) => {
  const { judulVideo, idSubModule, linkYoutube, durasi } = req.body;

  try {
    let videoFileName = null;
    let videoUrl = null;

    if (!linkYoutube && (!req.files || !req.files.video)) {
      return res
        .status(400)
        .json({ msg: "Masukkan link video atau link youtube" });
    }

    if (linkYoutube && req.files && req.files.video) {
      return res.status(400).json({
        msg: "Pilih hanya satu opsi: file video atau link youtube",
      });
    }

    if (req.files && req.files.video) {
      const videoFile = req.files.video;
      const videoTimestamp = Date.now();
      const videoExt = path.extname(videoFile.name);
      const videoRandomString = crypto.randomBytes(8).toString("hex");
      videoFileName = `${videoTimestamp}-${videoRandomString}${videoExt}`;
      videoUrl = `${req.protocol}://${req.get(
        "host"
      )}/assets/konten/videos/${videoFileName}`;
      const videoPath = `./public/assets/konten/videos/${videoFileName}`;

      const allowedType = [".mp4", ".webm"];

      if (!allowedType.includes(videoExt.toLowerCase())) {
        return res.status(422).json({ msg: "Format file video tidak valid" });
      }

      const maxSize = 50000000; // kira-kira segini dulu

      if (videoFile.size > maxSize) {
        return res.status(422).json({ msg: "tidak boleh melebihi 50mb" });
      }

      videoFile.mv(videoPath, (err) => {
        if (err) {
          return res.status(500).json({ msg: err.message });
        }
      });
    }

    if (linkYoutube) {
      videoFileName = null;
      videoUrl = null;
    }

    const kontenVideo = await KontenVideo.create({
      judul_video: judulVideo,
      id_sub_module: idSubModule,
      link_youtube: linkYoutube,
      video: videoFileName,
      video_url: videoUrl,
      durasi,
    });
    res.status(200).json(kontenVideo);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateKontenVideo = async (req, res) => {
  const { judulVideo, idSubModule, linkYoutube, durasi } = req.body;

  const kontenVideo = await KontenVideo.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!kontenVideo)
    return res.status(404).json({ msg: "konten video tidak ditemukan" });

  try {
    let videoFileName = KontenVideo.video;
    let videoUrl = KontenVideo.video_url;

    if (!linkYoutube && (!req.files || !req.files.video)) {
      return res
        .status(400)
        .json({ msg: "Masukkan link video atau link youtube" });
    }

    if (linkYoutube && req.files && req.files.video) {
      return res.status(400).json({
        msg: "Pilih hanya satu opsi: file video atau link Google Drive",
      });
    }

    if (req.files && req.files.video) {
      const videoFile = req.files.video;
      const videoTimestamp = Date.now();
      const videoExt = path.extname(videoFile.name);
      const videoRandomString = crypto.randomBytes(8).toString("hex");
      videoFileName = `${videoTimestamp}-${videoRandomString}${videoExt}`;
      videoUrl = `${req.protocol}://${req.get(
        "host"
      )}/assets/konten/videos/${videoFileName}`;
      const videoPath = `./public/assets/konten/videos/${videoFileName}`;

      const allowedType = [".mp4", ".webm"];

      if (!allowedType.includes(videoExt.toLowerCase())) {
        return res.status(422).json({ msg: "Format file video tidak valid" });
      }

      const maxSize = 50000000;

      if (videoFile.size > maxSize) {
        return res.status(422).json({ msg: "tidak boleh melebihi 50mb" });
      }

      // Hapus file lama jika ada
      if (kontenVideo.video) {
        const filePath = path.join(
          __dirname,
          "../public/assets/konten/videos",
          kontenVideo.video
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      videoFile.mv(videoPath, (err) => {
        if (err) {
          return res.status(500).json({ msg: err.message });
        }
      });
    }

    if (linkYoutube) {
      // jika memasukan link youtube hapus file video
      videoFileName = null;
      videoUrl = null;

      // Hapus file video
      if (kontenVideo.video) {
        const filePath = path.join(
          __dirname,
          "../public/assets/konten/videos",
          kontenVideo.video
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    await kontenVideo.update({
      judul_video: judulVideo,
      id_sub_module: idSubModule,
      link_youtube: linkYoutube,
      video: videoFileName,
      video_url: videoUrl,
      durasi,
    });

    res.status(200).json(kontenVideo);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteKontenVideo = async (req, res) => {
  try {
    const kontenVideo = await KontenVideo.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!kontenVideo) {
      return res.status(404).json({ msg: "konten video tidak ditemukan" });
    }

    // Hapus file lama jika ada
    if (kontenVideo.video) {
      const filePath = path.join(
        __dirname,
        "../public/assets/konten/videos",
        kontenVideo.video
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await kontenVideo.destroy();

    return res.status(200).json({ msg: "konten video berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
