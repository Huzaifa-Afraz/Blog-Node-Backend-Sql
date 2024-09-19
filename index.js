import express from "express"
import {db} from "./db.js"
import PostRouter from "./routes/posts.js"
import UsersRouter from "./routes/users.js"
import AuthRouter  from "./routes/auth.js"
import Upload from "./routes/upload.js"
import multer from "multer"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express();
app.use(cors())
app.use(cookieParser())
app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../front-end/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
  const upload = multer({ storage})
  app.post('/api/uploads', upload.single('file'), function (req, res) {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const file = req.file;
    res.status(200).json({ filename: file.filename });
  });

  
app.listen(8800)
 
app.use('/api/auth', AuthRouter)
app.use('/api/users', UsersRouter)
app.use('/api/posts', PostRouter)
// app.use('/api/upload',Upload)