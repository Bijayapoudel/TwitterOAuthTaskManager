import TaskList from "./components/TaskList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";


const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:4000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("Authentication Failed!");
      }).then(resObject => {
        setUser(resObject.user)
      }).catch(err => {
        console.log("err: ", err);
      })
    };
    getUser();
  }, [])

  console.log(user);

  return (


    <BrowserRouter>
      <div className="app">
        <Navbar user={user} />
        {/* <div className="task-container">
          <TaskList />
        </div> */}
        <ToastContainer />

        <Routes>
          {/* /login */}

          {/* <Route exact path="/" element={<TaskList />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} /> */}

          <Route path="/" element={user ? <TaskList /> : <Navigate to="/login" />} index={true} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />


        </Routes>
      </div>
    </BrowserRouter>



  )

}


export default App;




