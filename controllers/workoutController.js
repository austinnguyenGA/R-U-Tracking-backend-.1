const express = require('express')
const exercises = express.Router()
const Exercise = require('../models/workoutsModel')

const isAuthenticated = (req, res, next) => {
    if(req.session.currentUser){
        next()
    } else{
        res.status(403).json({ message: "Login is required"})
    }
}

// GET (index) workout list 
exercises.get('/', (req, res) => {
    Exercise.find({}, (error, foundExercises) => {
        if(error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(200).json(foundExercises)
        }
    })
})

// DELETE delete a workout 
exercises.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id, (error, deletedExercise) => {
        if(error) {
            res.status(400).json({ error: error.message })
        } else if (deletedSwim === null){
            res.status(404).json({ message: 'Exercise id not found' })
        } else {
            res.status(200).json({ message: `Exercise ${deletedExercise.name} deleted successfully`})
        }
    })
})

// UPDATE (update) a exercise
exercises.put('/:id', (req, res) => {
    Exercise.findByIdAndUpdate(req.params.id, (error, updatedExercise) => {
        if(error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(200).json({ 
                message: `Swim ${updatedExercise.id} updated successfully`,
                data: updatedExercise
            })
        }
    })
})

// POST (create) a swim
exercises.post('/', (req, res) => {
    console.log(req.body)
    Exercise.create(req.body, (error, createdExercise) => {
        if(error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(200).json(createdExercise)
        }
    })
})



module.exports = exercises