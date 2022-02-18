const mongoose = require('mongoose')
const { Schema, model } = mongoose

const exerciseSchema = new Schema({
    exercise: {type: String, required: true},
    reps: {type: String, required: true},
    sets: {type: String, required: false},
    duration: {type: String, required: false},
    date: {type: String, required: false},
})

module.exports = model('Exercise', exerciseSchema)