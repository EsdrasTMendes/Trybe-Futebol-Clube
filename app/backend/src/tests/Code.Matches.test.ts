import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a camada de ModelsMatches', () => {
  let chaiHttpResponse: Response;

  const expectValues = {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: true, 
  }

  before(async () => {
    sinon
      .stub(Matches, "findOne")
      .resolves(expectValues as Matches);
  });

  after(()=>{
    (Matches.findOne as sinon.SinonStub).restore();
  })

  it('retorna os objetos esperados por um findOne', async () => {
    let chaiHttpResponse = await chai.request(app)
    const result = await Matches.findOne({
      attributes: ['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress'],
      where: {id: 1},
    })
    if(result) {
      const {homeTeam, id, homeTeamGoals, awayTeam, awayTeamGoals, inProgress} = result;
      expect(id).to.be.equal(1);
      expect(homeTeam).to.be.equal(16);
      expect(homeTeamGoals).to.be.equal(1);
      expect(awayTeam).to.be.equal(8);
      expect(awayTeamGoals).to.be.equal(1);
    }
  });
});
