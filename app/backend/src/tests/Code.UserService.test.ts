import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import ServiceUser from '../services/servicesUsers';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  let chaiHttpResponse: Response;

  const service = new ServiceUser();

  const expectReturn = {
    token: 'shuahsoahisodhiaoshohdaohdoahsod'
  }

  before(async () => {
    sinon
      .stub(service, 'login')
      .resolves(expectReturn);
  });

  after(()=>{
    (service.login as sinon.SinonStub).restore();
  })

  it('verifica se retorna um token', async () => {
    let chaiHttpResponse = await chai.request(app)
    const ILogin =  {
      email: 'example@example.com',
      password: 'examplePassword',
    }
    const result = await service.login(ILogin);
    expect(Object.values(result)[0]).to.be.a.string;
  });
});
