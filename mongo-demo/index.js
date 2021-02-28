const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err))


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
    const course = new Course({
        name: 'PHP Course',
        author: 'Sahil',
        tags: ['php', 'backend'],
        isPublished: true
    })
    
    const result = await course.save()
    console.log(result)
}

async function getCourses() {
    const pageNumber = 2
    const pageSize = 10

    const courses = await Course
        .find({ author: 'Shariq', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
        
    console.log(courses)
}

// async function updateCourse(id) {
//     const course = await Course.findById(id)
//     if (!course) return
//     course.isPublished = true
//     course.author = 'Another Author'

//     const result = await course.save()
//     console.log(result)
// }

// async function updateCourse(id) {
//     const result = await Course.update({ _id: id }, {
//         $set: {
//             author: 'Bill Gates',
//             isPublished: false
//         }
//     })
//     console.log(result)
// }

async function updateCourse(id) {
    const result = await Course.findByIdAndUpdate( id, {
        $set: {
            author: 'Jack Maa',
            isPublished: false
        }
    }, {new:true})
    console.log(result)
}

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id })
    console.log(result)
}

removeCourse('603b4eb74c9fc23884555fd4')
// updateCourse('603b4eb74c9fc23884555fd4')
// createCourse()
// getCourses()


// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in
// nin (not in)
