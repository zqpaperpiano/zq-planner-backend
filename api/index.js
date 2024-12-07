const express = require('express');
const app = express();
const userRoutes = require('../routes/userRoutes');
const dungeonRoutes = require('../routes/dungeonRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})

app.use('/users', userRoutes);
app.use('/dungeon', dungeonRoutes);
