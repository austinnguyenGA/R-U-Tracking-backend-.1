const express = require('express')
const swims = express.Router()
const Swim = require('../models/swimModel')

const isAuthenticated = (req, res, next) => {
    if(req.session.currentUser){
        next()
    } else{
        res.status(403).json({ message: "Login is required"})
    }
}

// GET (index) swim list 
swims.get('/', (req, res) => {
    Swim.find({}, (error, foundSwims) => {
        if(error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(200).json(foundSwims)
        }
    })
})

// DELETE delete a swim 
swims.delete('/:id', (req, res) => {
    Swim.findByIdAndDelete(req.params.id, (error, deletedSwim) => {
        if(error) {
            res.status(400).json({ error: error.message })
        } else if (deletedSwim === null){
            res.status(404).json({ message: 'Swim id not found' })
        } else {
            res.status(200).json({ message: `Swim ${deletedSwim.name} deleted successfully`})
        }
    })
})

// UPDATE (update) a swim
swims.put('/:id', (req, res) => {
    Swim.findByIdAndUpdate(req.params.id, (error, updatedSwim) => {
        if(error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(200).json({ 
                message: `Swim ${updatedSwim.id} updated successfully`,
                data: updatedSwim 
            })
        }
    })
})

// POST (create) a swim
swims.post('/', (req, res) => {
    console.log(req.body)
    Swim.create(req.body, (error, createdSwim) => {
        if(error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(200).json(createdSwim)
        }
    })
})



module.exports = swims