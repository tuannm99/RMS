const supertest = require('supertest');
const { testApp, prepareTest } = require('..');

prepareTest();

const userInput = {
  username: 'minhtuan',
  password: '123@123ab',
};

describe('given the username and password are valid', () => {
  it('should return the user payload', async () => {
    const { statusCode } = await supertest(testApp).post('/api/v1/auth/login').send(userInput);
    expect(statusCode).toBe(200);
  });
});
