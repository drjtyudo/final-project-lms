const express = require("express");
const {
    getPelatihan,
    createPelatihan,
    deletePelatihan,
    updatePelatihan
    ,getPelatihanById
} = require("../controllers/pelatihanController");

const router = express.Router();
router.get('/pelatihan' , getPelatihan)
router.get('/pelatihan/:id' , getPelatihanById)
router.post('/pelatihan' , createPelatihan)
router.patch('/pelatihan/:id' , updatePelatihan)
router.delete('/pelatihan/:id' , deletePelatihan)


module.exports = router



