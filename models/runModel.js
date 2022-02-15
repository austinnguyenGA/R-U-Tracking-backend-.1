const mongoose = require('mongoose')
const { Schema, model } = mongoose

const runSchema = new Schema({
    event: {type: String, required: true},
    time: {type: String, required: true},
    goal: {type: String, required: false},
    reflection: {type: String, required: false},
    video: {type: String, required: false},
})

module.exports = model('Run', runSchema)