import TaskForm from "./TaskForm"
import Task from './Task'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios';
import loadingImage from "../assets/loader.jpg";


const TaskList = ({ user }) => {
    const [tasks, setTasks] = useState([])
    const [completed, setCompleted] = useState([])
    const [IsLoading, setIsLoading] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [taskID, setTaskID] = useState(" ")
    const [formData, setFormData] = useState({
        name: "",
        completed: false
    })


    //destructuring name .....
    const { name } = formData
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })       //existing properties of formData and change the name
    }

    const getTasks = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.get('/api/tasks');     // Wait for the axios request to complete
            setTasks(data);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false);
            // Set isLoading state back to default after getting tasks
        }
    }
    useEffect(() => {
        getTasks()
    }, []);                                                     //Empty dependency array ensures this effect runs only once after initial render



    const createTask = async (e) => {
        e.preventDefault();
        console.log(formData);                   //whether datas are  into the console or not!
        if (name.trim() === "") {
            return toast.error('Input field cannot be empty!');
        }
        try {
            await axios.post("api/tasks", formData);
            toast.success("Task added successfully!");                            // creating the task

            getTasks();
            setFormData({ ...formData, name: " " })                                       //clearing the form
        } catch (error) {
            toast.error(error.message);
            console.log(error.response.data);
        }
    };


    const deleteTask = async (id) => {
        try {
            await axios.delete(`/api/tasks/${id}`)
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }
    }

    //completed tasks...
    useEffect(() => {
        const cTask = tasks.filter((task) => {
            return task.completed === true
        })

        setCompleted(cTask)
    }, [tasks]);



    //getting a task.....
    const getSingleTask = async (task) => {
        setFormData({ name: task.name, completed: false });
        setTaskID(task._id)
        setIsEditing(true);
    };

    //update task....
    const updateTask = async (e) => {
        e.preventDefault()
        if (name === "") {
            return toast.error("Input field cannot be empty!");
        }
        try {
            await axios.put(`/api/tasks/${taskID}`, formData);
            setFormData({ ...formData, name: "" })
            setIsEditing(false)
            getTasks()
        } catch (error) {
            toast.error(error.message);
        }

    }

    //after completing tasks...

    const setToComplete = async (task) => {
        const newFormData = {
            name: task.name,
            completed: true
        }
        try {
            await axios.put(`/api/tasks/${task._id}`, newFormData)
        } catch (error) {
            toast.error(error.message);
        }
    }

    console.log('user:', user);

    return (
        <div className="cc">
            {/* <Navbar /> */}

            <h2 className="tManager">Task Manager</h2>
            <p>It is where your tasks are managed!</p>
            <TaskForm
                name={name}
                handleInputChange={handleInputChange}
                createTask={createTask}
                isEditing={isEditing}
                updateTask={updateTask}
            />
            {tasks.length > 0 && (
                <div className="--flex-between --pb">
                    <p>
                        <b>Total Tasks: </b>{tasks.length}
                    </p>
                    <p>
                        <b>
                            Completed Tasks:
                        </b>{completed.length}
                    </p>
                </div>
            )}


            <hr />
            {IsLoading && (
                <div className="--flex-center">
                    <img src={loadingImage} alt="loading" />
                </div>
            )}
            {!IsLoading && tasks.length === 0 ? (
                <p className="--py">No Task Added! Please Add a Task.</p>    //-py= padding on top and buttom
            ) : (
                <>
                    {tasks.map((task, index) => {
                        return <Task key={task._id} task={task} index={index} deleteTask={deleteTask}
                            getSingleTask={getSingleTask}
                            setToComplete={setToComplete} />   //passed as a props

                    })}
                </>
            )}


            {/* ){"}"} */}



        </div>

    )
}


export default TaskList



