const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide the Name']
    },
    completed: {
        type: Boolean,
        required: true,
        default: false                   //default value is false if not provided in input
    },

},
    {

        timestamps: true
    });


const Task = mongoose.model("Task", taskSchema);


module.exports = Task;                       //"Task" is what we sent to the database i.e. it stored "tasks" in the dbs.