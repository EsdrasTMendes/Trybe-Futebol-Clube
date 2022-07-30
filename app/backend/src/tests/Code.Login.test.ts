// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import 'dotenv/config';

chai.use(chaiHttp);

const { expect } = chai;

const ENDPOINT = '/login';
const request = chai.request(app);

describe('Endpoint de login', () => {
  it('Deve logar um usuario com sucesso', async () => {
    const user = {
      email: 'user@user.com',
      password: 'secret_user',
    }
    const response: Response = await request.post(ENDPOINT).send(user);
    expect(response.body.token).to.be.an('string');
  });
});