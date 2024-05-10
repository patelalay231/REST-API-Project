const bcrypt = require('bcrypt');

function passwordEncryption(password){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password,salt);
}

function comparePassword(raw,hash){
    return bcrypt.compareSync(raw,hash);
}

module.exports = {
    passwordEncryption,
    comparePassword
};