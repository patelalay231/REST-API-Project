const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    email:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
    password:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
    createdAt:{
        type:mongoose.SchemaTypes.Date,
        required : true,
        default: new Date(),
    },
});

module.exports = mongoose.model('user',user_schema);