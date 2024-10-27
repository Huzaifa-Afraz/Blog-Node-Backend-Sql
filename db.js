import mysql from "mysql2";
import dotenv from "dotenv"
dotenv.config();
console.log(process.env.MYSQL_HOST)
console.log(process.env.MYSQL_USER)
console.log(process.env.MYSQL_PASSWORD)
console.log(process.env.MYSQL_DATABASE)

export const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'Huzaifa123',
    database: process.env.MYSQL_DATABASE || 'blog'
});
