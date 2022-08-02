import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import ServiceMatches from '../services/serviceMatches';
import Matches from '../database/models/MatchesModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  let chaiHttpResponse: Response;

  const service = new ServiceMatches();

  const expectReturn = {
    id: 50,
    homeTeam: 1,
    awayTeam: 6,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true
  }

  before(async () => {
    sinon
      .stub(service, 'createMatche').resolves(expectReturn as Matches);
  });

  after(()=>{
    (service.createMatche as sinon.SinonStub).restore();
  })

  it('verifica se retorna uma partida criada', async () => {
    let chaiHttpResponse = await chai.request(app)
    const IMatchCreate =  {
      homeTeam: 1,
      awayTeam: 6,
      homeTeamGoals: 2,
      awayTeamGoals:2,
    }
    const result = await service.createMatche(IMatchCreate);
    expect(Object.values(result)[0]).to.be.a.string;
  });
});
