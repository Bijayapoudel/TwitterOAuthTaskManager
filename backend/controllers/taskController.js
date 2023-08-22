const Task = require('../model/taskModel');


//Create a task
const createTask = async (req, res) => {
    try {
        const task = await Task.insertMany(req.body)
        res.status(200).json(task)

    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ msg: error.message })
    }
};




//get alltasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

};


//get a task
const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(500).json(`No Task with id ${id}`)
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}



//Delete task

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ message: `Task with id ${id} not found!!` });
        }

        res.status(200).json({ message: `Task with id ${id} is deleted!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Update Task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;                                        //_id from db and this id from req.params
        const task = await Task.findByIdAndUpdate(
            { _id: id }, req.body, {
            new: true,
            runValidators: true
        });

        if (!task) {
            return res.status(404).json({ message: `Task with id ${id} not found!!` });
        }
        res.status(200).json(task);                                            //Success.........

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }




};

module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
};
