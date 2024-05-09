const express = require('express')
const { addLecture, deleteLecture, getLecture, updateLecture } = require('../controller/lecture')

const router = express.Router()

router.post('/add/lecture', addLecture)
router.delete('/deleteLecture/:id', deleteLecture)
router.get('/get/lecture', getLecture)
router.put('/updateLecture/:id',updateLecture)

module.exports = router