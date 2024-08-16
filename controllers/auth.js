//all the auth controllers here



import {db }from '../db.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
//login function logic
export const login=(req,res)=>{
    try{
        const query="SELECT * FROM users where email=?";
        // const {name, email, password}=req.body;
        db.query(query, [req.body.email], (err,data)=>{ 
            if(err) return res.status(404).json(err);
            if(data.length===0) return res.status(404).json("User not found");
            const isMatch=bcrypt.compareSync(req.body.password,data[0].password);
            if(!isMatch) return res.status(404).json("Invalid password");
            const {password, ...other}=data[0];
            
            const token=jwt.sign({id:data[0].id},"jwt")

                res.cookie("auth__token", token,{
                    httpOnly:true,
                }).status(200).json(other)
                
        })

    }catch(err){
        return res.status(500).json("An error occured Try again")
    }

}


//register funciton logic
export const register=(req,res)=>{
    try{
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json("All fields are required" );
        }
//check if user already exists
    const sqlQ="select * from users where email=?";
    db.query(sqlQ, [email],(err, data)=>{
        if (err) return res.status(404).json(err)
            if (data.length) return res.status(409).json("User already exists!")
                
    
    //Hash the password and create the user
const salt =bcrypt.genSaltSync(10);
const Hash=bcrypt.hashSync(req.body.password, salt);
const q="INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
const VALUES=[req.body.name, req.body.email, Hash];
db.query(q, [VALUES],(err, data)=>{
    if(err) return res.json(err)
        return res.status(200).json("User created!")});
})
}
catch(err){
    console.error(err);
        return res.status(500).json("An error occurred try again");
    
}
}





//logut function logic
export const logout=(req,res)=>{
    try {
        res.clearCookie("auth__token",{
            sameSite:"none",
            secure:true
        }).status(200).json("user has been logout")
        
    } catch (error) {
        res.status(500).json(error)
    }
}