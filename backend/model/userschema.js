const mongoose=require('mongoose');
const JWt=require('jsonwebtoken')

const{ Schema }=mongoose;
const userschema=new Schema({
    name:{
        type:String,
        required:[true,'user name is required'],
        trim:true
    },
    email:{
        type:String,
        unique:[true,'already register'],
        required:[true,'email is required'],
        lowercase:true
    },
    password:{
        type:String
    },
    forgotpasswordToken:{
        type:String
    },
    forgotpasswordExpiryDate:{
        type:Date
    },
   

},{
    timestamps:true
});
userschema.methods={
    jwtToken(){
        return JWt.sign({
            id:this._id,email:this.email},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
    }
}

const usermodel=mongoose.model('user',userschema);
module.exports=usermodel;