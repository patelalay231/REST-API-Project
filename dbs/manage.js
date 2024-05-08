const mongoose = require('mongoose');

// connect the mongodb server
mongoose
.connect('mongodb://localhost:27017/')
.then(()=> console.log('Connected to DB'))
.catch((err)=>console.log(err));
