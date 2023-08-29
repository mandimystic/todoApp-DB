require("dotenv").config();
const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const path = require('path');
const usersRouter = require("./controllers/users");
const loginRouter = require('./controllers/login');
const cookieParser = require ('cookie-parser');
const cors = require ('cors');
const morgan = require ('morgan');
const todosRouter = require("./controllers/todos");
const { userExtractor } = require("./middleware/auth");
const logoutRouter = require("./controllers/logout");
const { MONGO_URI } = require("./config");


// Funcion que se llama a sí misma 

(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("conectado a mongoose");
    } catch (error) {
        console.log(error);   
    }
})()    

// Rutas Frontend
app.use(cors())
app.use(cookieParser());
app.use(express.json());

app.use('/', express.static(path.resolve('views', 'home')))
app.use('/signup', express.static(path.resolve('views', 'signup')))
app.use('/components', express.static(path.resolve('views', 'components')))
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')))
app.use('/todos/', express.static(path.resolve('views', 'todos')))
app.use('/images', express.static(path.resolve('img')))

app.use('/login', express.static(path.resolve('views', 'login')))

module.exports=app;

// Rutas BackEnd


app.use(morgan('tiny'));

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/todos' ,userExtractor ,todosRouter);

