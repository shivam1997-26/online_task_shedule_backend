const course = require("../model/course")

const addCourse = async (req, res) => {
    const { name, level, description } = req.body
    try {
        const courseData = new course({
            name,
            level,
            description,
            image: req.file.filename
        })

        const result = await courseData.save()
        res.status(200).json({ message: 'Course added successfully', result })

    } catch (err) {
        console.log(err)
    }
}

const getCourse = async (req, res) => {
    try {
        const courseData = await course.find().populate({
            path: 'lectures',
            populate: { path: 'instructor' }
        });
        res.json(courseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getaCourse = async (req, res) => {
    const { id } = req.params
    try {
        const courseData = await course.findById(id).populate({
            path: 'lectures',
            populate: { path: 'instructor' }
        });
        res.json(courseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteCourse = async (req, res) => {
    const { id } = req.params
    try {
        const courseData = await course.findByIdAndDelete(id)
        res.json(courseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateCourse = async (req, res) => {
    const { id } = req.params
    try {

        const getCourseData = await course.findById(id)

        if (!getCourseData) {
            res.status(404).json({ message: "Course not found" });
        } else {
            const data = {
                name: req.body.name || getCourseData.name,
                level: req.body.level || getCourseData.level,
                description: req.body.description || getCourseData.description,
                image: req?.file?.filename || getCourseData.image
            }
            const courseData = await course.findByIdAndUpdate(id, data, { new: true })
            res.status(200).json({ message: 'course updated successfully', courseData });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { addCourse, getCourse, getaCourse, deleteCourse, updateCourse }