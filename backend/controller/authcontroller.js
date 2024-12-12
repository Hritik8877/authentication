const usermodel = require("../model/userschema");
const emailValidator=require('email-validator')

const signup=async(req,res,next)=>{
    const {name,email,password,confirmpassword}=req.body;
    console.log(name,email,password,confirmpassword);

    if(!name||!email||!password||!confirmpassword){
        res.status(400).json({
            success:false,
            message:"every field is required"
        })
    }

    if (password !== confirmpassword) {
        return res.status(400).json({
            success: false,
            message: "Passwords do not match",
        });
    }
    const validemail=emailValidator.validate(email);
    if(!validemail){
        res.status(400).json({
            success:false,
            message:"please enter valid email"
        })
    }
    try{
        const userinfo=usermodel(req.body);
    const result=await userinfo.save();

return res.status(200).json({
    success:true,
    data:result
})
    } catch(e){
        if(e.code===11000){
            return res.status(400).json({
                success:false,
                message: e.message
            })
        }
    return res.status(400).json({
        success:false,
        message: e.message
    })
    }
}

const signin=async(req,res)=>{
 const {email,password}=req.body;

 if(!email||!password){
    return res.status(400).json({
        success:false,
        message: "every field is mandatory"
    })
 }
 const user=await usermodel
 .findOne({
    email
 })
 .select('+password')

 if(!user ||user.password!==password){
    return res.status(400).json({
        success:false,
        message: "invalid credentials"
    })
 }

 try{
    const token =user.jwtToken();
 user.password=undefined;

 const cookieOption={
    maxAge:24*60*60*1000,
    httpOnly:true,
 };
 res.cookie("token",token,cookieOption);
 res.status(200).json({
    success:true,
    data:user
 })

 }  catch(e){
    res.status(400).json({
        success:false,
        message:e.message
    })

 }

 
}

module.exports={
    signup,
    signin
};