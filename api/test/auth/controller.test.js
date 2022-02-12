const { testApp, prepareTest } = require('..');
const supertest = require('supertest');

prepareTest();

const userInput = {
  username: 'minhtuan',
  password: '1234556',
};

describe('given the username and password are valid', () => {
  it('should return the user payload', async () => {
    //const createUserServiceMock = jest
    //.spyOn(UserService, 'createUser')
    //// @ts-ignore
    //.mockReturnValueOnce(userPayload);

    const { statusCode, body, error } = await supertest(testApp)
      .post('/api/v1/auth/login')
      .send(userInput);
    console.log(error);

    expect(statusCode).toBe(200);

    //expect(body).toEqual(userPayload);

    //expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
  });
});
