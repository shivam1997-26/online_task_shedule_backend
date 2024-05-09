const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "instructor"
    }
}, {
    timestamps: true
}
)

instructorSchema.pre("save", async function (next) {
    let salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password, salt);
})

instructorSchema.methods.comparePasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('instructors', instructorSchema)