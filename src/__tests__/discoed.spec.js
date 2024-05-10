const { discord_verify_func }  = require('../controllers/auth');
const discordUser = require("../dbs/schema/discord_user_schema");

jest.mock('../dbs/schema/discord_user_schema');
const accessToken = '123';
const refreshToken = '123';
const profile = {
    id : '1323214124',
}

const done = jest.fn((x,y) => x);

describe('Discord Verify Function', () => {
    it('should return user if found',async () =>{
        const mockUser = {
            id : 'id_123',
            discordID : 'discord_id',
        };
        discordUser.findOne.mockResolvedValueOnce(mockUser);
        await discord_verify_func(accessToken,refreshToken,profile,done);
        expect(discordUser.findOne).toHaveBeenCalledWith({discordID : profile.id});
        expect(done).toHaveBeenCalledWith(null,mockUser);
    })
    
    
    it('should create user & return if not found',async () =>{
        const newUser = {
            id : profile.id,
            discordID : profile.discordID,
        }
        discordUser.findOne.mockImplementationOnce(() => undefined);
        discordUser.create.mockResolvedValueOnce(newUser)
        await discord_verify_func(accessToken,refreshToken,profile,done);
        expect(discordUser.findOne).toHaveBeenCalledWith({discordID : profile.id});
        expect(discordUser.findOne).toHaveReturnedWith(undefined);
        expect(discordUser.create).toHaveBeenCalledWith({discordID : profile.id});
        expect(done).toHaveBeenCalledWith(null,newUser);
    })
})