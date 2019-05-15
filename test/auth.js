var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require("C:\\Users\\halil\\WebstormProjects\\prog4-eindopdracht\\index.js");

chai.should();

chai.use(chaiHttp);


describe('registeren en inloggen', () => {

  it('registeren', function (done) {
    chai.request(server)
      .post('/auth/register')
      .set('content-type', 'application/json')
      .send({
        "firstName": "Halil Ibrahim",
        "lastName": "Erdemir",
        "streetAddress": "ijssellaan 50a",
        "postalCode": "6826SM" ,
        "city": "Arnhem",
        "dateOfBirth": "30-11-1998",
        "phoneNumber": "06 43093660",
        "email":"halil@test.nl",
        "password":"test"
      })
      .end(function(err, res, body) {
        res.should.have.status(200);
        done()
      })
  });

  it('inloggen met verkeerd email en password', function (done) {
    const email = "ha574lil@t:estnl"
    const password = "test"
    chai.request(server)
      .post('/login/'+email+'/'+password)
      .set('Content-Type', 'application/json')
      .end(function(err, res, body) {
        body.should.have.throw;
        done()
      })
  });



  it('inloggen met email en password', function (done) {
    const email = "halil@test.nl"
    const password = "test"
    chai.request(server)
      .post('/login/'+email+'/'+password)
      .set('Content-Type', 'application/json')
      .end(function(err, res, body) {
        res.should.have.status(200);
        done()
      })
  });

});