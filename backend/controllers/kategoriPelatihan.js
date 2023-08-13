const db = require('../models/index.js')
const PelatihanKategori = db.PelatihanKategori

exports.getAll = async (req,res) => {
    try {
        const response = await PelatihanKategori.findAll()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

exports.create = async (req,res) => {
    const {id_pelatihan, id_kategori} = req.body
    try {
        const create = await PelatihanKategori.create({
            id_pelatihan,
            id_kategori
        })
        res.status(201).json({msg : "success"})
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}