import {db} from "../db.js"
export const getPosts=(req,res)=>{
    const query=req.query.cat ? "select * from posts where cat=?":"select * from posts";

    db.query(query, [req.query.cat],(err, data)=>{
        if(err)res.status(500).json("Error to fetch posts")
            return res.status(200).json(data)
    })
}
export const getPost=(req,res)=>{}
export const addPost=(req,res)=>{}
export const updatePost=(req,res)=>{}
export const deletePost=(req,res)=>{}