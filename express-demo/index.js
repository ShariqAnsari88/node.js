const debug = require('debug')('app:startup')
const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const Joi = require('joi')
const logger = require('./middleware/logger')
const authenticate = require('./middleware/authenticate')
const courses = require('./routes/courses')
const homepage = require('./routes/homepage')
const express = require('express')
const app = express();
app.set('view engine', 'pug')
app.set('views', './views') // default

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use('/', homepage)
app.use('/api/courses', courses)

console.log('Application Name:' + config.get('name'))
console.log('Mail Server:' + config.get('mail.host'))

if(app.get('env') === 'development') {
    app.use(morgan('tiny'))
    debug('Morgan enabled...')
}

app.use(logger)
app.use(authenticate)

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))