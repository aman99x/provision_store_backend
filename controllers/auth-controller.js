const User = require("../models/user-model");
const bcrypt = require("bcryptjs");


const home = async(req, res) => {
    try{
    res.status(200).send("welcome to auth page")
    }catch (error){
       console.log(error)
    }
}

const register = async(req, res) => {
    try{
        const {username, email, phone, password} = req.body;
        const userExist = await User.findOne({email : email});

        if(userExist){
            return res.status(400).json({msg: "email already exits"});
        }
        const userCreated = await User.create({
            username, 
            email, 
            phone, 
            password,
        });     
        res.status(201).json({
            message: "registration successfull", 
            token: await userCreated.generateToken(),
            userId:userCreated._id.toString(),
        });
    }catch(error){
        res.status(500).json("internal server error");
    }
}

const login = async (req,res) =>{
    try{
       const {email, password} = req.body;
       const  userExist = await User.findOne({email}); 

       if(!userExist){
        return res.status(400).json({message:"Invalid Credential"});
       }

       const user = await userExist.comparePassword(password);
       
       if(user){
        res.status(200).json({
            message: "Login successfull", 
            token: await userExist.generateToken(),
            userId:userExist._id.toString(),
        });
       }else{
        res.status(401).json({message:"Invalid email or password"})
       }
    }catch(error){
        // res.status(500).json("internal server error");
        next(error);
    }
}

const user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ msg: userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };
module.exports = {home, register, login, user};
