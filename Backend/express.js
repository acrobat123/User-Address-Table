const express = require("express");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();

const dbPath = path.join(__dirname,"userAddressData.db");

app.use(express.json());

let db = null;

const intializeServer = async()=>{
    try{
        db = await open({
            filename:dbPath,
            driver:sqlite3.Database,
        });
        app.listen(3005,()=>{
            console.log("Server Started")
        })
    }catch(e){
        console.log(`Db error:${e.message}`);
        process.exit(1);
    }
}

app.get("/getUsers", async(req,res)=>{
    const getUsersTableQuery = `SELECT *
    FROM User;`;
    const getUsersTable = await db.all(getUsersTableQuery);
    res.send(getUsersTable)
})



app.get("/getAddress",async(req,res)=>{
    const addressTableQuery =`
    SELECT*
    FROM Address;`;
    const addressTable = await db.all(addressTableQuery);
    res.send(addressTable)
})

app.post("/register",async (req,res)=>{
    const {name,address} = req.body
    try{
        const check_user_exist_query = `SELECT *
    FROM User
    WHERE name = '${name}';`;
    const check_user_exist = await db.get(check_user_exist_query)
    if (check_user_exist === undefined){
        const setNewUserQuery = `
        INSERT INTO User(name)
        VALUES ('${name}');`;
        const setNewUser = await db.run(setNewUserQuery);
        const getUserIdQuery = `SELECT * FROM User WHERE name = '${name}';`;
        const getUserId = await db.get(getUserIdQuery)
        const {id} = getUserId
        const setNewAddressQuery = `INSERT INTO Address(userId,address)
        VALUES ('${id}','${address}');`;
        const setNewAddress = await db.run(setNewAddressQuery);
        res.status(200)
        res.send("sucess")
    }else{
        const getUserIdQuery = `SELECT * FROM User WHERE name = '${name}';`;
        const getUserId = await db.get(getUserIdQuery)
        const {id} = getUserId
        const setNewAddressQuery = `INSERT INTO Address(userId,address)
        VALUES ('${id}','${address}');`;
        const setNewAddress = await db.run(setNewAddressQuery);
        res.status(200)
        res.send("sucess")
    }
    }catch(e){
        alert(e.message)
    }
    
    
})
intializeServer();

module.exports = app;