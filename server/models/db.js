const mysql=require("mysql2")
require("dotenv").config()
const path=require("path")
const fs=require("fs")

const pool=mysql.createPool({
    port:process.env.DBPORT,
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    ssl:{
      ca:fs.readFileSync(path.resolve(__dirname,"../certs/isrgrootx1.pem"))
    },
    queueLimit:0,
    connectionLimit:100,
    waitForConnections:true,
    multipleStatements:true
}).promise()


module.exports=pool


