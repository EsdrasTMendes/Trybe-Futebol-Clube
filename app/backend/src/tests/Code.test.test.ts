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

const ENDPOINT = '/matches';
const request = chai.request(app);

describe('testa uma exceção na rota /post matches', () => {
  it('Deve retornar um erro quando não existe body na requisição', async () => {
    const response: Response = await request.post(ENDPOINT);
    expect(response.status).to.be.equal(401);
    expect(response.text).to.be.equal({"message": "Token não encontrado"});
  });
});