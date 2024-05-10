const User = require("../dbs/schema/user_schema");
const discordUser = require("../dbs/schema/discord_user_schema");

const { passwordEncryption, comparePassword } = require('../utils/helper');

async function authRegisterController(req,res){
    let {password,email} = req.body;
    const userDB = await User.findOne({email});
    if(userDB){
        res.status(401);
        return res.send({msg:"User account already exist"});
    }
    password = passwordEncryption(password);
    await User.create({email,password});
    return res.send({msg:"User account created!"});
}


async function discord_verify_func(accessToken,refreshToken,profile,done){
    const {id : discordID} = profile;
    try{
        const user = await discordUser.findOne({discordID});
        if(user){
            return done(null,user);
        }    
        else{
            const newUser = await discordUser.create({discordID});
            return done(null,newUser);
        }
    }
    catch(err){
        return done(err,null);
    }
}

module.exports = {authRegisterController , discord_verify_func};