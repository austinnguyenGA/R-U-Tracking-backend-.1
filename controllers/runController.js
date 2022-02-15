const express = require('express')
const runs = express.Router()
const Run = require('../models/runModel')

const isAuthenticated = (req, res, next) => {
    if(req.session.currentUser){
        next()
    } else{
        res.status(403).json({ message: "Login is required"})
    }
}

// GET (index) Run list 
runs.get('/', (req, res) => {
    Run.find({}, (error, foundRuns) => {
        if(error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(200).json(foundRuns)
        }
    })
})

// DELETE delete a Run 
runs.delete('/:id', (req, res) => {
    Run.findByIdAndDelete(req.params.id, (error, deletedRun) => {
        if(error) {
            res.status(400).json({ error: error.message })
        } else if (deletedRun === null){
            res.status(404).json({ message: 'Run id not found' })
        } else {
            res.status(200).json({ message: `Run ${deletedRun.name} deleted successfully`})
        }
    })
})

// UPDATE (update) a Run
runs.put('/:id', (req, res) => {
    Run.findByIdAndUpdate(req.params.id, (error, updatedRun) => {
        if(error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(200).json({ 
                message: `Run ${updatedRun.id} updated successfully`,
                data: updatedRun 
            })
        }
    })
})

// POST (create) a Run
runs.post('/', (req, res) => {
    console.log(req.body)
    Run.create(req.body, (error, createdRun) => {
        if(error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(200).json(createdRun)
        }
    })
})



module.exports = runs