import {db} from "../db.js"
export const getPosts=(req,res)=>{
    const query=req.query.cat ? "select * from posts where cat=?":"select * from posts";

    db.query(query, [req.query.cat],(err, data)=>{
        if(err)res.status(500).json("Error to fetch posts")
            return res.status(200).json(data)
    })
}
export const getPost=(req,res)=>{
    const query="SELECT name, title, `desc`,p.img, p.cat, p.id AS postid, u.img AS userimg,date FROM blog.users u JOIN blog.posts p ON u.id=p.userid WHERE p.id=?";
    console.log(req.params.id)
    db.query(query, [req.params.id],(err, data)=>{
        if(err)return res.status(500).json("Error to fetch post try to reload")
            console.log(data[0])
            return res.status(200).json(data[0])

    })

}
export const addPost=(req,res)=>{
    const {title,desc,cat}=req.body
}
export const updatePost=(req,res)=>{}
export const deletePost=(req,res)=>{
    const query="DELETE FROM posts WHERE id=?"
    db.query(query,[req.params.id],(err,data)=>{
        if(err)return res.status(500).json("Error to delete post")
            return res.status(200).json("Post deleted")
        })
}