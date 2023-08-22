const express = require('express');
const Task = require('../model/taskModel');
const router = express.Router();
const { createTask, getTasks, getTask, deleteTask, updateTask } = require("../controllers/taskController");


//combining  5 lines of code below into 2 lines of routes........
// router.post("/", async (req, res) => {
//     console.log(req.body);
// })

router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTask).delete(deleteTask).put(updateTask);



// router.post('/', createTask);
// router.get('/', getTasks);
// router.get('/:id', getTask);
// router.delete('/:id', deleteTask);
// router.put('/:id', updateTask);



module.exports = router;

