const PORT=process.env.PORT||5000
const app=require('./app.js');
const dotenv = require('dotenv');
dotenv.config();


app.listen(PORT,()=>{
    console.log('server is listening at  http://localhost:${PORT} ');
    
});