import jwt from "jsonwebtoken"
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
    // console.log(req.params.id)
    db.query(query, [req.params.id],(err, data)=>{
        if(err)return res.status(500).json("Error to fetch post try to reload")
            // console.log(data[0])
            return res.status(200).json(data[0])

    })

}
export const addPost = (req, res) => {
    const token = req.cookies.auth__token;
  
    if (!token) return res.status(401).json("You are unauthorized");
  
    jwt.verify(token, "jwt", (err, userInfo) => {
      if (err) return res.status(403).json("Token is invalid");
  
      // Check if the image is provided
      if (!req.body.img || !req.body.img.filename) {
        return res.status(400).json("Image cannot be null");
      }
  
      const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `userid`) VALUES(?)";
      const values = [
        req.body.title,
        req.body.desc,
        req.body.img.filename, // Ensure that the image filename is not null
        req.body.cat,
        req.body.date,
        userInfo.id,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json("Error adding post");
  
        return res.json("Post added successfully");
      });
    });
  };
  
export const updatePost = (req, res) => {
    try {
      const token = req.cookies.auth__token;
      if (!token) return res.status(401).json("You are unauthorized");
  
      jwt.verify(token, "jwt", (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid");
  
        const postid = req.params.id;
        const imgUrl = req.body.img?.filename || null;
  
        // First, retrieve the current image if a new one is not provided
        const selectQuery = "SELECT img FROM posts WHERE id = ? AND userid = ?";
        db.query(selectQuery, [postid, userInfo.id], (err, result) => {
          if (err) return res.status(500).json("Error retrieving current image");
          
          // Use the existing image if no new one is provided
          const currentImg = result[0]?.img || null;
          const updatedImg = imgUrl || currentImg;
  
          const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `userid`=?";
          const values = [
            req.body.title,
            req.body.desc,
            updatedImg, // Update image with either new or existing one
            req.body.cat,
            postid,
            userInfo.id,
          ];
  
          db.query(q, values, (err, data) => {
            if (err) return res.status(500).json("Error updating post");
  
            return res.status(200).json("Post updated successfully");
          });
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Server error");
    }
  };
  




export const deletePost=(req,res)=>{
    const token=req.cookies.auth__token;
    if(!token) return res.status(401).json("you are unauthorized")
        jwt.verify(token, "jwt",(err, userid)=>{
    if(err) return res.status(403).json('tocken is not valid')
        const query="DELETE FROM posts WHERE id=? AND userid=?";
    db.query(query,[req.params.id,userid],(err, data)=>{
        if(err)return res.status(500).json("Error to delete post")
            return res.status(200).json("post deleted")
    })

    })
    db.query(query,[req.params.id],(err,data)=>{
        if(err)return res.status(500).json("Error to delete post")
            return res.status(200).json("Post deleted")
        })
}