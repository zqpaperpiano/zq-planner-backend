const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const dungeonRoutes = require('./routes/dungeonRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const allowedOrigins = [
    'https://ziqing-s-planner.onrender.com',
    'http://localhost:3000'
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})

app.get('/checkStatus', (req, res) => {
    let evens = [];
    for(let i = 0; i < 1000; ++i){
        if(evens % 2 === 0){
            evens.push(i);
        }
    }
    res.send('found ', evens.length, ' even numbers below 1000'); // Send a response
});

app.use('/users', userRoutes);
app.use('/dungeon', dungeonRoutes);
app.use('/userStats', require('./routes/userStatRoutes'));
app.use('/event', require('./routes/eventRoutes'));
app.use('/moodDiary', require('./routes/moodDiaryRoutes'));