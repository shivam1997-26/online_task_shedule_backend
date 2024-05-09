const course = require("../model/course");
const lecture = require("../model/lecture");

const addLecture = async (req, res) => {
    const { courseId, instructorId, date } = req.body;

    const checkCourse = await course.find()

    if (checkCourse.length > 0) {

        const conflict = await lecture.findOne({ instructor: instructorId, date: date });
        if (conflict) {
            return res.status(400).json({ message: 'This instructor is already assigned to a lecture on this date.' });
        }
        const lectureData = new lecture({
            course: courseId,
            instructor: instructorId,
            date: date
        });

        try {
            const newLecture = await lectureData.save();
            const updatedCourse = await course.findByIdAndUpdate(courseId, {
                $push: { lectures: newLecture._id }
            }, { new: true });
            res.status(201).json(newLecture);

        } catch (err) {
            res.status(500).json({ message: 'Failed to add the lecture due to an error.' });
        }

    } else {
        res.status(500).json({ message: 'Please add the course first' });
    }
};


const getLecture = async (req, res) => {
    try {
        const lectureData = await lecture.find().populate('instructor')
        res.status(200).json(lectureData)
    } catch (err) {
        res.status(500).json({ message: 'somthing went wrong' })
    }
}


const updateLecture = async (req, res) => {
    const { id } = req.params;
    const { courseId, instructorId, date } = req.body;
    try {
        const data = await lecture.findById(id)
        if (!data) {
            res.status(404).json({ message: 'record not found' })
        }

        const dataforUpdate = {
            course: courseId || data.course,
            instructor: instructorId || data.instructor,
            date: date || data.date
        }
        const updatedData = await lecture.findByIdAndUpdate(id, dataforUpdate, { new: true })
        res.status(200).json(updatedData)
    } catch (err) {
        res.status(500).json({ message: 'somthing went wrong' })
    }
}

const deleteLecture = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLecture = await lecture.findByIdAndDelete(id);
        if (!deletedLecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        await course.updateMany({}, { $pull: { lectures: id } });

        res.status(200).json({ message: 'Lecture deleted successfully', deletedLecture });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};




module.exports = { addLecture, deleteLecture, getLecture, updateLecture }