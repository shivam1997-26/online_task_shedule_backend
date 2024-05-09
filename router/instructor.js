const express = require('express')
const { addInstructor, getInstructor, getaInstructor, deleteInstructor, updateInstructor, login } = require('../controller/instructor')
const router = express.Router()

router.post('/add/instructor', addInstructor)
router.get('/get/allInstructorList', getInstructor)
router.get('/get/Instructor/:id', getaInstructor)
router.delete('/Instructor/:id', deleteInstructor)
router.put('/instructor/:id',updateInstructor)
router.post('/login',login)

module.exports = router