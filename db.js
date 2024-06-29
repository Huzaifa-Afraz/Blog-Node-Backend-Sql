import mysql from "mysql2";

export const db=mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'Huzaifa123',
        database:'blog'
    }
)