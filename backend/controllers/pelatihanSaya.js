const {
  PelatihanSaya,
  Pelatihan,
  Kategori,
  Rating,
  Views,
  PelatihanKategori,
  Module,
  SubModule,
  KontenPdf,
  KontenPPT,
  KontenPembahasan,
  KontenVideo,
} = require("../helper/relation");

exports.getPreviewSaya = async ( req ,res ) => {
  
}


exports.getPelatihanSaya = async (req, res) => {
  try {
    const userId = req.params.userId;

    const response = await PelatihanSaya.findAll({
      include: {
        model: Pelatihan,
        as: "Pelatihan",
        include: [
          {
            model: Kategori,
            as: "Kategoris",
            attributes: ["id", "kategori"],
          },
          {
            model: Rating,
            as: "Ratings",
            attributes: ["rating"],
          },
          {
            model: Views,
            as: "Views",
            attributes: ["view"],
          },
          {
            model: Module,
            as: "Modules",
            include: [
              {
                model: SubModule,
                as: "SubModules",
              },
            ],
          },
        ],
      },
      where: { id_user: userId },
    });

    const updatedResponse = [];

    response.forEach((pelatihan) => {
      if (pelatihan.Pelatihan.status_terbit === "terbit") {
        const modules = pelatihan.Pelatihan.Modules;

        const totalSubModule = modules.reduce((total, modul) => {
          return total + modul.SubModules.length;
        }, 0);

        let Progress = pelatihan.progress;

        if (pelatihan.progress === null) {
          Progress = 0;
        }
        console.log(Progress);
        console.log(totalSubModule);

        const resultProgress = (Progress / totalSubModule) * 100;
        const roundedProgress = parseFloat(resultProgress.toFixed()); // bulatkan

        // console.log(pelatihan.Pelatihan.Kategoris);

        updatedResponse.push({
          id_pelatihan_saya: pelatihan.id, // id pelatihan saya
          id_user: pelatihan.id_user, // id user
          id_pelatihan: pelatihan.id_pelatihan, //  id pelatihan
          progress: roundedProgress, // progress
          diakses: pelatihan.diakses, // diakses
          status: pelatihan.status, // status
          selesai: pelatihan.selesai, // selesai
          pelatihan_id: pelatihan.Pelatihan.id, // progress
          judul_pelatihan: pelatihan.Pelatihan.judul, // id pelatihan
          deskripsi: pelatihan.Pelatihan.deskripsi, //  deskripsi
          kategori: pelatihan.Pelatihan.Kategoris, // kategori
          harga: pelatihan.Pelatihan.harga, // harga
          image: pelatihan.Pelatihan.image, // image
          image_url: pelatihan.Pelatihan.image_url,
          createdAt: pelatihan.Pelatihan.createdAt,
          updatedAt: pelatihan.Pelatihan.updatedAt,
        });
      }
    });

    res.status(200).json({ msg: "success", updatedResponse });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getPelatihanByIdPelatihanSaya = async (req, res) => {
  try {
    const pelatihanSaya = await PelatihanSaya.findOne({
      include: {
        model: Pelatihan,
        as: "Pelatihan",
        include: [
          {
            model: Kategori,
            as: "Kategoris",
            attributes: ["id", "kategori"],
          },
          {
            model: Rating,
            as: "Ratings",
            attributes: ["rating"],
          },
          {
            model: Views,
            as: "Views",
            attributes: ["view"],
          },
          {
            model: Module,
            as: "Modules",
            include: [
              {
                model: SubModule,
                as: "SubModules",
                include: [
                  {
                    model: KontenPdf,
                    as: "KontenPdfs",
                  },
                  {
                    model: KontenPPT,
                    as: "KontenPPTs",
                  },
                  {
                    model: KontenPembahasan,
                    as: "KontenPembahasans",
                  },
                  {
                    model: KontenVideo,
                    as: "KontenVideos",
                  },
                ],
              },
            ],
          },
        ],
      },
      where: {
        id: req.params.id,
      },
    });

    if (!pelatihanSaya) {
      return res.status(404).json({ msg: "Pelatihan saya not found" });
    }

    const updatedResponse = (pelatihanSaya) => {
      if (pelatihanSaya.Pelatihan.status_terbit === "terbit") {
        const ratings = pelatihanSaya.Pelatihan.Ratings || [];
        const views = pelatihanSaya.Pelatihan.Views || [];

        const ratingsCount = ratings.length;

        const totalRatings = ratings.reduce(
          (sum, rating) => sum + parseFloat(rating.rating),
          0
        );

        const roundedAverage =
          ratingsCount !== 0
            ? parseFloat((totalRatings / ratingsCount).toFixed(1))
            : 0;
        const totalViews = views.reduce((sum, view) => sum + view.view, 0);

        //  Yang kamu dapatkan

        const modules = pelatihanSaya.Pelatihan.Modules;

        const kontenPDFStats = modules.reduce(
          (kontenStats, modul) => {
            modul.SubModules.forEach((subModul) => {
              const pdfsWithFile = subModul.KontenPdfs.filter(
                (pdf) => pdf.pdf || pdf.pdf_url
              );
              const pdfsWithLink = subModul.KontenPdfs.filter(
                (pdf) => pdf.linkGdrive
              );
              kontenStats.withFile += pdfsWithFile.length;
              kontenStats.withLink += pdfsWithLink.length;
            });
            return kontenStats;
          },
          { withFile: 0, withLink: 0 }
        );

        const totalKontenPembahasan = modules.reduce((total, modul) => {
          return (
            total +
            modul.SubModules.reduce(
              (subTotal, subModul) =>
                subTotal + subModul.KontenPembahasans.length,
              0
            )
          );
        }, 0);

        const kontenPPTStats = modules.reduce(
          (kontenStats, modul) => {
            modul.SubModules.forEach((subModul) => {
              const pptsWithFile = subModul.KontenPPTs.filter(
                (ppt) => ppt.ppt || ppt.ppt_url
              );
              const pptsWithLink = subModul.KontenPPTs.filter(
                (ppt) => ppt.linkGdrive
              );
              kontenStats.withFile += pptsWithFile.length;
              kontenStats.withLink += pptsWithLink.length;
            });
            return kontenStats;
          },
          { withFile: 0, withLink: 0 }
        );

        const bahanBacaan =
          kontenPDFStats.withFile +
          kontenPDFStats.withLink +
          totalKontenPembahasan +
          kontenPPTStats.withFile +
          kontenPPTStats.withLink;

        const kontenVideoStats = modules.reduce(
          (kontenStats, modul) => {
            modul.SubModules.forEach((subModul) => {
              subModul.KontenVideos.forEach((video) => {
                if (video.video || video.video_url) {
                  kontenStats.withFile += 1;
                  kontenStats.totalDurationWithFile += video.durasi || 0;
                }
                if (video.link_youtube) {
                  kontenStats.withLink += 1;
                  kontenStats.totalDurationWithLink += video.durasi || 0;
                }
              });
            });
            return kontenStats;
          },
          {
            withFile: 0,
            withLink: 0,
            totalDurationWithFile: 0,
            totalDurationWithLink: 0,
          }
        );
        const kontenUnduh =
          kontenPDFStats.withFile +
          kontenPPTStats.withFile +
          kontenVideoStats.withFile;

        // hitung total durasi dalam menit
        const totalDurasiMenit =
          kontenVideoStats.totalDurationWithFile +
          kontenVideoStats.totalDurationWithLink;

        // hitung total jam dan total menit
        const totalJam = Math.floor(totalDurasiMenit / 60);
        const totalMenit = totalDurasiMenit % 60;
        // rangkai total durasi
        const totalDurasiString =
          totalJam > 0 && totalMenit > 0
            ? `${totalJam} jam ${totalMenit} menit`
            : totalJam > 0
            ? `${totalJam} jam`
            : `${totalMenit} menit`;

        //  disini yang kamu dapatkan tidak ada, yang ada adalah progress

          // tabel progress untuk menyimpan selesai dari setiap sub module
          // tabel progress 
          // id
          // id_user
          // id_sub_module
          // status (sudah)
          
        
        return {
          id: pelatihanSaya.Pelatihan.id,
          judul: pelatihanSaya.Pelatihan.judul,
          kategori: pelatihanSaya.Pelatihan.Kategoris,
          deskripsi: pelatihanSaya.Pelatihan.deskripsi,
          harga: pelatihanSaya.Pelatihan.harga,
          dibuat_oleh: pelatihanSaya.Pelatihan.dibuat_oleh,
          status: pelatihanSaya.Pelatihan.status,
          level: pelatihanSaya.Pelatihan.level,
          status_terbit: pelatihanSaya.Pelatihan.status_terbit,
          tanggal_terbit: pelatihanSaya.Pelatihan.tanggal_terbit,
          image: pelatihanSaya.Pelatihan.image,
          image_url: pelatihanSaya.Pelatihan.image_url,
          masa_lisensi: pelatihanSaya.Pelatihan.masa_lisensi,
          createdAt: pelatihanSaya.Pelatihan.createdAt,
          updatedAt: pelatihanSaya.Pelatihan.updatedAt,
          averageRating: roundedAverage,
        };
      }
      return null;
    };

    res.status(200).json({
      msg: "ok",
      pelatihan: updatedResponse(pelatihanSaya),
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
