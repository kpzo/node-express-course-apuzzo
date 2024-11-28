let { people } = require('../data');

// Get all people
const getPeople = (req, res) => {
    if (people.length === 0) {
        return res.status(200).json({ success: true, data: [], message: 'No people found.' });
    }
    res.status(200).json({ success: true, data: people });
};

// Create a new person
const createPerson = (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ success: false, msg: 'Please provide a valid name.' });
    }
    const newPerson = { id: people.length + 1, name };
    people.push(newPerson);
    res.status(201).json({ success: true, data: newPerson });
};

// Create a person (Postman specific route)
const createPersonPostman = (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ success: false, msg: 'Please provide a valid name.' });
    }
    const newPerson = { id: people.length + 1, name };
    people.push(newPerson);
    res.status(201).json({ success: true, data: people });
};

// Update a person by ID
const updatePerson = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const personIndex = people.findIndex((person) => person.id === Number(id));

    if (personIndex === -1) {
        return res.status(404).json({ success: false, msg: `No person found with ID ${id}.` });
    }
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ success: false, msg: 'Please provide a valid name.' });
    }

    people[personIndex].name = name; // Update the name
    res.status(200).json({ success: true, data: people[personIndex] });
};

// Delete a person by ID
const deletePerson = (req, res) => {
    const { id } = req.params;
    const person = people.find((person) => person.id === Number(id));

    if (!person) {
        return res.status(404).json({ success: false, msg: `No person found with ID ${id}.` });
    }

    people = people.filter((person) => person.id !== Number(id)); // Remove the person
    res.status(200).json({ success: true, msg: `Person with ID ${id} deleted.`, data: people });
};

module.exports = {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson,
};
