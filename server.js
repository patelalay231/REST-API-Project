const express = require("express");
const users = require("./data.json");
const path = require('path');
const fs = require("fs");
const { error } = require("console");

const app = express();
const PORT = 8001;

app.use(express.urlencoded({extended: false}));
//Routes

// display users 
app.get('/users',(req,res) =>{
    const html = `
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>EMAIL</th>
                <th>GENDER</th>
                <th>ID_ADDRESS</th>
            </tr>
        </thead>
        <tbody>
                ${users.map(user => 
                `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.email}</td>
                    <td>${user.gender}</td>
                    <td>${user.ip_address}</td>
                </tr>
                `).join("")}
        </tbody>
    </table>
    `;
    res.send(html);
})

// users list - json
app.get('/api/users',(req,res) =>{
    return res.json(users);
})

// fetching particular user
app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
})

app.post('/api/users',(req,res)=>{
    const body = req.body;
    users.push({...body,id:users.length+1});
    fs.writeFile('./data.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:"Success",id:users.length});
    })
    
})

app.patch('/api/users/:id',(req,res)=>{
    const body = req.body;
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    user.first_name = body.first_name;
    user.last_name = body.last_name;
    user.gender = body.gender;
    user.email = body.email;
    user.ip_address = req.ip;
    console.log(req);
    fs.writeFile('./data.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:"Success"});
    })
})

app.delete('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const index = users.findIndex(user => (user.id === id));
    if (index !== -1) {
        users.splice(index, 1);
        fs.writeFile('./data.json',JSON.stringify(users),(err,data)=>{
            return res.json({status:"Success"});
        })
    } else {
        return res.json({error:"User not found"});
    }
})


app.listen(PORT,() => console.log(`server started at port ${PORT}`));