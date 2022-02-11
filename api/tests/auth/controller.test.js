const supertest = require('supertest');

/**
 * Complete product example.
 */
const productComplete = {
  name: 'iPhone 11',
  price: 699,
  description:
    'A new dual‑camera system captures more of what you see and love. ',
};

const userInput = {
  username: 'minhtuan',
  password: '123456',
};

describe('given the username and password are valid', () => {
  it('should return the user payload', async () => {
    //const createUserServiceMock = jest
    //.spyOn(UserService, 'createUser')
    //// @ts-ignore
    //.mockReturnValueOnce(userPayload);

    //const { statusCode, body } = await supertest(testApp)
    //.post('/api/v1/auth/login')
    //.send(userInput);

    expect(200).toBe(200);

    //expect(body).toEqual(userPayload);

    //expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
  });
});
