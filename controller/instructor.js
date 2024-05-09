const { generateToken } = require("../config/jwtToken")
const instructor = require("../model/instructor")

const addInstructor = async (req, res) => {
    try {
        const data = await instructor.findOne({ email: req.body.email })
        if (!data) {
            const instructorData = new instructor(req.body)
            const result = await instructorData.save()
            res.status(200).json({ message: 'instructor added successfully', result })
        } else {
            res.status(400).json({ message: 'record already exist' })
        }
    } catch (err) {
        console.log(err)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await instructor.findOne({ email });
        if (userData && await userData.comparePasswords(password)) {

            const data ={
                _id: userData?._id,
                name: userData?.name,
                email: userData?.email,
                phone: userData?.phone,
                role:userData?.role,
                token: generateToken(userData?._id)
        }
        return res.status(200).json({ message: 'Login successful', data });
    } else {
        return res.status(404).json({ message: 'Invalid email or password' });
    }
} catch (error) {

    return res.status(500).json({ message: 'something went wrong' });
}
}

const getInstructor = async (req, res) => {
    try {
        const data = await instructor.find()
        if (!data) {
            res.status(400).json({ message: 'no record found' })
        }
        res.status(200).json({ message: 'record found', data })
    } catch (err) {
        console.log(err)
    }
}

const getaInstructor = async (req, res) => {
    const { id } = req.params
    try {
        const data = await instructor.find({ _id: id })
        if (!data) {
            res.status(400).json({ message: 'no record found' })
        }
        res.status(200).json({ message: 'record found', data })
    } catch (err) {
        console.log(err)
    }
}

const updateInstructor = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    try {
        const data = await instructor.findById(id);
        if (!data) {
            return res.status(404).json({ message: 'No record found' });
        } else {

            if (password) {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt);
                req.body.password = hash;
            }

            const updatedData = {
                name: name || data.name,
                email: email || data.email,
                phone: phone || data.phone,
                password: req.body.password || data.password
            };

            const updatedRecord = await instructor.findByIdAndUpdate(id, updatedData, { new: true });
            res.status(200).json({ message: "Record updated successfully", data: updatedRecord });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteInstructor = async (req, res) => {
    const { id } = req.params
    try {
        const data = await instructor.findByIdAndDelete({ _id: id })
        if (!data) {
            res.status(400).json({ message: 'no record found' })
        }
        res.status(200).json({ message: 'Record deleted successfully', data })
    } catch (err) {
        console.log(err)
    }
}


module.exports = { addInstructor, getInstructor, getaInstructor, deleteInstructor, updateInstructor, login }