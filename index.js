import express from "express"
import {db} from "./db.js"
import PostRouter from "./routes/posts.js"
import UsersRouter from "./routes/users.js"
import AuthRouter  from "./routes/auth.js"
import cors from "cors"

const app=express();
app.use(cors())
app.use(express.json())

app.listen(8800,()=>{
    console.log("Server is running on port 8800")
    db.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Query result:', results[0].solution); 
    });
})
 
app.use('/api/auth', AuthRouter)
app.use('/api/users', UsersRouter)
app.use('/api/posts', PostRouter)