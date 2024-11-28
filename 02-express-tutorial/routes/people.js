const express = require('express')
const peopleRouter = express.Router()

const {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson,  
} = require('../controllers/people.js');

peopleRouter.route('/').get(getPeople).post(createPerson)
peopleRouter.route('/postman').post(createPersonPostman)
peopleRouter.route('/:id').put(updatePerson).delete(deletePerson)


module.exports = peopleRouter

