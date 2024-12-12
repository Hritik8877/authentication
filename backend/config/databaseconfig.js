const mongoose=require('mongoose');
const MONGODB_URL="mongodb://localhost:27017/mydatab"

const databaseconnect=()=>{
    mongoose
    .connect(MONGODB_URL)
    .then((conn)=>console.log("database connected"))
    .catch((err)=>console.log(err.message)
    )
}
module.exports=databaseconnect;