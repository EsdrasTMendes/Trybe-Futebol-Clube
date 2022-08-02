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

const ENDPOINT = '/teams';
const request = chai.request(app);

describe('Testa o Endpoint de times', () => {
  it('Deve retornar todos os times', async () => {
    const response: Response = await request.get(ENDPOINT);
    expect(response.body.length).to.be.equal(16);
    expect(response.body[0]).to.have.keys(['id', 'teamName']);
  });
});