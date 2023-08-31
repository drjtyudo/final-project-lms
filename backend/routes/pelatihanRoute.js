const express = require("express");
const {
    getPelatihan,
    createPelatihan,
    deletePelatihan,
    updatePelatihan
    ,getPelatihanById,
    getPelatihanBykategori,
    getAllKontenByIdSubModule 
} = require("../controllers/pelatihanController");

const router = express.Router();
router.get('/pelatihan' , getPelatihan)
router.get('/pelatihan/:id' , getPelatihanById)
router.get('/pelatihan/kategori/:id' , getPelatihanBykategori)
router.get('/konten/sub-module/:id' , getAllKontenByIdSubModule) // ambil semua konten yang berdasarkan id submodule 
router.post('/pelatihan' , createPelatihan)
router.patch('/pelatihan/:id' , updatePelatihan)
router.delete('/pelatihan/:id' , deletePelatihan)


module.exports = router



