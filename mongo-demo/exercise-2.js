const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Successfully connected!'))
    .catch(err => console.log('Error', err))

const courseSchema = new mongoose.Schema({
    id: Number,
    name: String,
    author: String,
    tags: [ String ],
    price: Number,
    isPublished: Boolean
})

const Course = mongoose.model("Course", courseSchema)

async function getCourses() {
    const courses = await Course
    // .find({ isPublished: true, tags: { $in: ['frontend', 'backend']} }) // AND operator
    .find({ isPublished: true })
    .or([ {tags: 'frontend'}, {tags: 'backend'}]) // OR operator
    .sort('-price')
    .select({ name: 1, author: 1, price: 1 })

    console.log(courses)
}

getCourses();