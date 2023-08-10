const express = require("express");
const {
    getPelatihan,
    createPelatihan,
    deletePelatihan,
    updatePelatihan
} = require("../controllers/pelatihanController");

const router = express.Router();

router.get('/pelatihan' , getPelatihan)
router.post('/pelatihan' , createPelatihan)
router.patch('/pelatihan/:id' , updatePelatihan)
router.delete('/pelatihan/:id' , deletePelatihan)


module.exports = router



