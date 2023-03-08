const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    gender: String,
    date_of_birth: String,
    place_of_birth: String,
    email: String,
    study_group: String
    
});

module.exports = mongoose.model("students", studentSchema);