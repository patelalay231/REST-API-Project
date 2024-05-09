const passport = require('passport');
const {Strategy} = require('passport-local');
const User = require("../dbs/schema/user_schema");
const { comparePassword } = require('../utils/helper');

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
passport.use(
    new Strategy({
        usernameField : 'email',
    },async (email,password,done)=>{
        console.log(email);
        console.log(password);
        if(!email || !password) 
            throw new Error('Missing Credentials!!');

        try{
            const user = await User.findOne({email});
            if(!user) throw new Error('User doesn\'t exists!! Should Register First');

            const isValid = comparePassword(password,user.password);
            if(isValid){
                console.log('authenticate successfully!!')
                done(null,user);
            }
            else{
                console.log('authenticate unsuccessful!!')
                done(null,null);
            }
        }
        catch(err){
            done(err,null);
        }
    })
)