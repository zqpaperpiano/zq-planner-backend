const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();


app.listen(3001, () =>{
    console.log('server is listening on port 3001');
});

app.use(express.json()); //middleware to parse JSON bodies
app.use('/users', userRoutes); //takes care of all user related functions
