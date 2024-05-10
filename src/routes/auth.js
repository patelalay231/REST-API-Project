const express = require('express');
const passport = require('passport');

const User = require("../dbs/schema/user_schema");
const router = express();
const { passwordEncryption, comparePassword } = require('../utils/helper');
const { authRegisterController } = require('../controllers/auth');

// login in
// router.post('/login',async (req,res) => {
//     const {email,password} = req.body;
//     if(!email || !password) return res.status(401).send({msg:"email or password field is missing!!"});
//     const user = await User.findOne({email});
//     if(!user) return res.status(401).send({msg:"user not exist, please register first!!"});
//     const isValid = comparePassword(password,user.password);
//     if(!isValid) return res.status(401).send({msg:"oops! password is wrong."});
//     req.session.user = user;
//     return res.status(200).send({msg:"You're logged in."});
// });

router.post('/login',passport.authenticate('local'),(req,res)=>{
    console.log('logged in!');
    return res.send(200);
})

//to register user
router.post('/register', authRegisterController)

router.get('/discord',passport.authenticate('discord'),(req,res)=>{
    res.sendStatus(200);
});

router.get('/discord/redirect',passport.authenticate('discord'),(req,res)=>{
    res.sendStatus(200);
});


// export the auth module
module.exports = router;