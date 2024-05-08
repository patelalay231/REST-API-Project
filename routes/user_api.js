const express = require('express');
const users = require("../data/data.json");
const fs = require("fs");


app = express();

app.use((req,res,next)=>{
    if(req.session.user) next();
    else res.send("Please login to the system!")
})

app.get('/display',(req,res) =>{
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

//to see list of sent requests 
app.get('/added',(req,res)=>{
    const {users} = req.session;
    if(users){
        return res.send(users);
    }
    return res.send({"message":"No request user sent!"});
})

//sending request to user   
app.post('/adding',(req,res)=>{
    const {Id,email} = req.body;
    const user = {Id,email};
    const {users} = req.session;
    if(users){
        users.user_reqs.push(user);  
    }
    else{
        req.session.users = {
            user_reqs:[user]
        };
    }
    return res.send(201);
})

// users list - json
app.get('/',(req,res) =>{
    res.cookie('visted',true,{
        maxAge:60000,
    });
    return res.json(users);
})

// fetching particular user
app.get('/:id',(req,res)=>{
    console.log(req.cookies);
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
})

app.post('/',(req,res)=>{
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


module.exports = app;