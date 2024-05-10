const passport = require('passport');
const { Strategy } = require('passport-discord');
const User = require("../dbs/schema/discord_user_schema");
const { discord_verify_func } = require('../controllers/auth');


passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async (id,done)=>{
    try{
        const user = await User.findById(id);
        if(!user) throw new Error('User not found!');
        done(null,user);
    }
    catch(err){
        done(err,null);
    }
})

passport.use(new Strategy({
    clientID : '1238159403274862673',
    clientSecret : 'bqZEDT99Vakp3gx_ht3nzbIzzz4yVOeV',
    callbackUrl : ['http://localhost:8000/auth/discord/redirect','http://localhost:8000/auth/discord/'],
    scope : ['identify'],
    },
    discord_verify_func
));