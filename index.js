import express from "express"
const app=express();
app.user(express.json())
app.listen(8800,()=>{
    console.log("Server is running on port 8800")
})
