import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamsModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a camada de ModelTeams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findOne")
      .resolves({
        id: 1,
        teamName: 'Avaí/Kindermann'
      } as Team);
  });

  after(()=>{
    (Team.findOne as sinon.SinonStub).restore();
  })

  it('retorna os objetos esperados por um findOne', async () => {
    let chaiHttpResponse = await chai.request(app)
    const result = await Team.findOne({
      attributes: ['teamName', 'id'],
      where: {id: 1},
    })
    if(result) {
      const {teamName, id} = result;
      expect(teamName).to.be.equal('Avaí/Kindermann');
      expect(id).to.be.equal(1);
    }
  });
});
