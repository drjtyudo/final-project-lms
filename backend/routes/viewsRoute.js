const express = require('express');
const {getAllViews , addViews ,getAllViewsByIdPelatihan} = require('../controllers/Views.js');
const { verifyToken } = require('../middleware/middleware.js');

const router = express.Router()

router.get('/views' , getAllViews)
router.get('/views/:id_pelatihan' , getAllViewsByIdPelatihan)
router.post('/views' , verifyToken,addViews)
// router.patch('/views/update/:id' , addViews)
// router.delete('/views/delete/:id' , addViews)

module.exports = router