const express = require('express')
const route = express.Router()

const genres = [
    {id: 1, name: "action"},
    {id: 2, name: "animation"},
    {id: 3, name: "crime"},
    {id: 4, name: "comedy"},
    {id: 5, name: "drama"},
]

route.get('/', (req, res) => {
    res.send(genres)
})

route.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.sendStatus(404).send('record not found')

    res.send(genre)
})

route.post('/', (req, res) => {

    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        name: req.body.name 
    }

    genres.push(genre)
    res.send(genre)
})

route.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('record not found!')

    const {error} = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name
    res.send(genre)
})

route.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('record not found!')

    const index = genres.indexOf(genre)

    genres.splice(index, 1)
    res.send(genre)
})

validateGenre = (genre) => {
    const schema = {
        name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    }

    return Joi.validate(genre, schema)
}

module.exports = route