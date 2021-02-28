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
    .find({ isPublished: true })
    .or([ 
        { price: { $gte: 20 } },
        { name: /.*by.*/i }
    ]) // OR operator
    .sort('-price')
    .select('name author price')

    console.log(courses)
}

getCourses();