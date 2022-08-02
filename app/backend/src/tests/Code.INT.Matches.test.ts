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

const userExample = {
  email: 'admin@admin.com',
  password: 'secret_admin'
};

describe('testa a criação de uma partida pela rota post /matches', () => {
  it('testa se é possível inserir uma partida com login' , async () => {
    const login = await chai
    .request(app)
    .post('/login')
    .send({email: userExample.email, password: userExample.password });

  const novaPartida = await chai
  .request(app)
  .post('/matches')
  .set({authorization: login.body.token})
  .send({
    "homeTeam": 1,
    "awayTeam": 6,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  });

  expect(novaPartida).to.have.status(201);
  expect(novaPartida.body).to.have.property('id');
  })
})

describe('testa a criação de uma partida pela rota post /matches', () => {
  it('testa se não é possível inserir uma partida sem login' , async () => {
    const login = await chai
    .request(app)
    .post('/login')
    .send({email: 'outroemail', password: 'invalido' });
    expect(login).to.have.status(401);
    expect(login.body.message).to.equal('Incorrect email or password');
  })
})

describe('testa a criação de uma partida pela rota post /matches', () => {
  it('testa que não é possível inserir uma partida sem o token' , async () => {
    const login = await chai
    .request(app)
    .post('/login')
    .send({email: userExample.email, password: userExample.password });

  const novaPartida = await chai
  .request(app)
  .post('/matches')
  .send({
    "homeTeam": 1,
    "awayTeam": 6,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  });

  expect(novaPartida).to.have.status(401);
  expect(novaPartida.body.message).to.be.equals('Token não encontrado');
  })
})

describe('testa a alteração do inprogress de uma partida pela rota post /matches/:id/finish', () => {
  it('testa é possível alterar o status da partida' , async () => {

  const novaPartida = await chai
  .request(app)
  .patch('/matches/1/finish');

  expect(novaPartida).to.have.status(200);
  expect(novaPartida.body.message).to.be.equals('Finished');
  })
})

describe('testa a criação de uma partida pela rota post /matches', () => {
  it('testa que não é possivel criar a partida com dois times iguais' , async () => {
    const login = await chai
    .request(app)
    .post('/login')
    .send({email: userExample.email, password: userExample.password });

  const novaPartida = await chai
  .request(app)
  .post('/matches')
  .set({authorization: login.body.token})
  .send({
    "homeTeam": 1,
    "awayTeam": 1,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  });

  expect(novaPartida).to.have.status(401);
  expect(novaPartida.body.message).to.be.equal('It is not possible to create a match with two equal teams');
  })
})