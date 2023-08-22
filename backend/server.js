const express = require('express')
const Task = require("./model/taskModel");
const mongoose = require("mongoose");
require("./passport");
const passport = require("passport");
const app = express();
const port = process.env.PORT || 4000;
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");
const authRoute = require("./authRoutes/auth");
const session = require('express-session');
const path = require('path');


app.use(
    session({ secret: 'jnjnfkjdnfj', name: "session", keys: ["lama"], cookie: { secure: false }, maxAge: 24 * 60 * 60 * 100 })
);


//added
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());                             //global middleware
app.use(express.urlencoded({ extended: true }));      //parse


app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}
));
// Cross- origin resource sharing(CORS) is a mechanism for integrating applications.CORS
// defines a way for client web applications that are loaded in one domain to interact with resources in 
//another domain


app.use("/api/tasks", taskRoutes);
app.use("/auth", authRoute);

//DB CONNECTION......

const url = 'mongodb://localhost:27017/task';                  //task is the name of collection in database.
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,                // Server selection timeout in milliseconds
    socketTimeoutMS: 45000,                         // Socket timeout in milliseconds
}).then(() => {
    console.log("Connection Successful!");
}).catch((e) => {
    console.log("Not Successful!!");
})



// //static files....
// app.use(express.static(path.join(__dirname, '../frontend/build')));
// ///__dirname is current directory
// app.get('*', function (req, res) {
//     res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));   //this will send index file from build
// });



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

