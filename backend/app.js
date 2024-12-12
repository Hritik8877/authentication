// //require('dotenv').config();
// const express=require('express');
// const app=express();
// const authrouter=require('./router/authroute');
// const databaseconnect = require('./config/databaseconfig');
// const cors=require('cors');

// databaseconnect();

// app.use(express.json())

// app.use('/api/auth',authrouter)
// app.use(cors({
//     origin:'http://localhost:3000'//[process.env.REACT_APP_URL]
//     ,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials:true
// }))

// app.use('/', (req,res)=>{
//     res.status(200).json({data:'jwtauth server --'})
// })
// module.exports=app;


const express = require('express');
const cors = require('cors');
const app = express();
const authrouter = require('./router/authroute');
const databaseconnect = require('./config/databaseconfig');
const dotenv = require('dotenv');
dotenv.config();

databaseconnect();

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from frontend
    credentials: true // Allow credentials (cookies, etc.)
}));

app.use(express.json()); // Parse JSON body

app.use('/api/auth', authrouter);
app.use('/', (req, res) => {
    res.status(200).json({ data: 'jwtauth server --' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
});
