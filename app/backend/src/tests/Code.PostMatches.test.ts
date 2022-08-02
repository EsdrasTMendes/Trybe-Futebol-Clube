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

describe('Endpoint /matches', () => {
  it('deve retornar uma partida ', async () => {
    const Newmatche = {
      homeTeam: 1,
      awayTeam: 2,
      homeTeamGoals:2,
      awayTeamGoals: 2,
    }
    const response: Response = await request.post(ENDPOINT).send(Newmatche);
    expect(response.error.status).to.be.equal(401);
  });
});