//all the auth controllers here



import {db }from '../db.js'
import bcrypt from "bcryptjs"

//login function logic
export const login=(req,res)=>{
    console.log("login controller")
}


//register funciton logic
export const register=(req,res)=>{
    const sqlQ="select * from users where email=? or  username=?";
    db.query(sqlQ, [req.body.email, req.body.username],(err, data)=>{
        if (err) return res.json(err)
            if (data.length) return res.json({message: "User already exists!"})
                
    })
    //Hash the password and create the user
const salt =bcrypt.genSaltSync(10);
const Hash=bcrypt.hashSync(req.body.password, salt);
const q="INSERT INTO users (`usernam`, `email`, `password`) VALUES (?)";
const VALUES=[req.body.username, req.body.email, Hash];
db.query(q, [VALUES],(err, data)=>{
    if(err) return res.json(err)
        return res.status(200).json( "User created!")});


}




//logut function logic
export const logout=(req,res)=>{}