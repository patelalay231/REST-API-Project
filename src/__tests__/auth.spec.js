// will do unit testing using the jest 

const {authRegisterController} = require('../controllers/auth');

const User = require("../dbs/schema/user_schema");
const { passwordEncryption } = require('../utils/helper');



//stubbing - creating fake request,response object

const req = {
    body : {
        email : 'fake_email',
        password : 'fake_password',
    },
};

const res = {
    status : jest.fn((x) => x),
    send: jest.fn((x) => x),
}

//testing if block of register route

jest.mock("../dbs/schema/user_schema");

it('should send a status code of 400 when user exits',async () => {
    User.findOne.mockImplementationOnce(() => ({
        id : 1,
        email : 'email',
        password : 'password',
    }));
    await authRegisterController(req,res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledTimes(1);
});

//testing else block of register route


jest.mock('../utils/helper',() => ({
    passwordEncryption : jest.fn((x) => x),
    save : jest.fn(() => ''),
}))


it('should send a status code of 200 when new user created',async () => {
    User.findOne.mockResolvedValueOnce(undefined);
    User.create.mockResolvedValueOnce(({
        id : 1,
        email : 'email',
        password : 'password',
    }));
    await authRegisterController(req,res);
    expect(passwordEncryption).toHaveBeenCalledWith('fake_password');
    expect(User.create).toHaveBeenCalledWith({
        email : 'fake_email',
        password : 'fake_password',
    });
    User.findOne.mockResolvedValueOnce();
    expect(res.send).toHaveBeenCalledTimes(1);
});