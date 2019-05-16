var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require("C:\\Users\\halil\\WebstormProjects\\prog4-eindopdracht\\index.js");

chai.should();

chai.use(chaiHttp);

describe('apartement functie', () => {

  it('bekijk alle apartmenten', function (done) {
    chai.request(server)
      .post('/api/appartments')
      .set('Content-Type', 'application/json')
      .end(function(err, res, body) {
        res.should.have.status(200);
        done()
      })
  });

  it('bekijk apartment met id  =1', function (done) {
    const id = 1
    chai.request(server)
      .post('/api/appartments/'+id)
      .set('content-type', 'application/json')
      .end(function(err, res, body) {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.should.have.property('ApartmentId').eql(id);
        done();
      })
  });



});