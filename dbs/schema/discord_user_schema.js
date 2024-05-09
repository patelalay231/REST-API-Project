const mongoose = require('mongoose');

const discord_user_schema = new mongoose.Schema({
    discordID:{
        type:mongoose.SchemaTypes.String,
        required : true,
    },
    createdAt:{
        type:mongoose.SchemaTypes.Date,
        required : true,
        default: new Date(),
    },
});

module.exports = mongoose.model('discord-user',discord_user_schema);