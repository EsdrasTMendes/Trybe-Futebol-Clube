import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        username: 'name',
        role: 'admin',
        email: 'name@name.com',
        password: 'senhasecreta123',
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('...', async () => {
    let chaiHttpResponse = await chai.request(app)
    const result = await User.findOne({
      attributes: ['username', 'role', 'email', 'password'],
      where: {id: 1},
    })
    if(result) {
      const {username, role, email, password} = result;
      expect(username).to.be.equal('name');
      expect(role).to.be.equal('admin');
      expect(email).to.be.equal('name@name.com');
      expect(password).to.be.equal('senhasecreta123');
      expect(User.init).to.be.have.been.caller();
    }
  });
});