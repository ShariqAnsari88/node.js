const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const genres = [
    {id: 1, name: "action"},
    {id: 2, name: "animation"},
    {id: 3, name: "crime"},
    {id: 4, name: "comedy"},
    {id: 5, name: "drama"},
]

app.get('/', (req, res) => {
    res.send('This is http://vidly.com')
})

app.get('/api/genres', (req, res) => {
    res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.sendStatus(404).send('record not found')

    res.send(genre)
})

app.post('/api/genres', (req, res) => {

    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        name: req.body.name 
    }

    genres.push(genre)
    res.send(genre)
})

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('record not found!')

    const {error} = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name
    res.send(genre)
})

app.delete('/api/genres/:id', (req, res) => {
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


const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening on port ' + port + '...'))