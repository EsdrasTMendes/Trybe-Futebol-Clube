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

describe('Testa o Endpoint de partidas', () => {
  it('Deve retornar todos as partidas', async () => {
    const response: Response = await request.get(ENDPOINT);
    expect(response.body[0]).to.have.keys(['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway']);
  });
});