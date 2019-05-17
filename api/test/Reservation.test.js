const chai = require('chai');

const expect = chai.expect;
const url = `http://localhost:4000`;
const request = require('supertest')(url);

describe('GraphQL', () => {
  it('Returns reservation with id = 10', (done) => {
    request.post('/graphql')
      .send({ query: '{ getReservation(id: 10) { id name hotelName arrivalDate departureDate } }'})
      .expect(200)
      .end((err, res) => {
        // res should be an array with one reservation
        if (err) return done(err);
        res.body.reservation.should.have.property('id');
        res.body.reservation.should.have.property('name');
        res.body.reservation.should.have.property('hotelName');
        res.body.reservation.should.have.property('arrivalDate');
        res.body.reservation.should.have.property('departureDate');
        done();
      })
  })
});