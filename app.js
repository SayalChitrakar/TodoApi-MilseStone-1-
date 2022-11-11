const express = require('express');
const app = express();

const todoRoutes = require('./Routes/TodoRoutes');
const progressRoutes = require('./Routes/ProgressRoutes');
const testingRoutes = require('./Routes/TestingRoutes');
const doneRoutes = require('./Routes/DoneRoutes');
const userRoutes = require('./Routes/userRoutes');

app.use(express.json());

app.use('/api/v1/todo',todoRoutes)
app.use('/api/v1/progress',progressRoutes)
app.use('/api/v1/testing',testingRoutes)
app.use('/api/v1/done',doneRoutes)
app.use('/api/v1/user',userRoutes)
module.exports = app;