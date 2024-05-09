const passport = require('passport');
const { Strategy} = require('passport-discord');
const User = require("../dbs/schema/discord_user_schema");


passport.use(new Strategy({
    clientID : '1238159403274862673',
    clientSecret : 'bqZEDT99Vakp3gx_ht3nzbIzzz4yVOeV',
    callbackUrl : ['http://localhost:8000/auth/discord/redirect','http://localhost:8000/auth/discord/'],
    scope : ['identify'],
    },
    async (accessToken,refreshToken,profile,done)=>{
    console.log(profile);
    try{
        const user = await User.findOne({
            discordID : profile.id,
        });
        if(user){
            return done(null,user);
        }    
        else{
            const newUser = await User.create({
                discordID: profile.id,
            });
            return done(null,newUser);
        }
    }
    catch(err){
        return done(err,null);
    }
}));