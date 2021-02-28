const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Successfully connected!'))
    .catch(err => console.log('Error', err))

const courseSchema = new mongoose.Schema({
    id: Number,
    name: String,
    author: String,
    tags: [ String ],
    isPublished: Boolean
})

const Course = mongoose.model("Course", courseSchema)

async function getCourses() {
    const courses = await Course
    .find({ author: 'Shariq', isPublished: true })
    .sort({ id: 1 })
    .select({ name: 1, author: 1})

    console.log(courses)
}

getCourses();