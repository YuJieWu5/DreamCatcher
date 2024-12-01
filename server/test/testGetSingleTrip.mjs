import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Test Single Trip result', function () {
    var requestResult;
    var response;
    const validTripId = "ab0b358d-7b22-4631-93a0-b9d891ddd8f8"; 

    before(function (done) {
        chai.request("http://localhost:8080")
            .get(`/app/trip/${validTripId}`)
            .end(function (err, res) {
                requestResult = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should return a valid trip object', function () {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('tripId', validTripId);
        expect(response).to.have.headers;
    });


    it('The scenes in the trip should have valid IDs', function () {
        expect(requestResult.scenes).to.be.an('array');
        requestResult.scenes.forEach(sceneId => {
            expect(sceneId).to.be.a('string'); 
        });
    });

    it('The trip object has known properties', function () {
        expect(requestResult).to.include.keys('tripId', 'userId', 'tripName', 'scenes', 'routes');
        expect(requestResult).to.have.property('tripId').that.is.a('string');
        expect(requestResult).to.have.property('userId').that.is.a('string');
        expect(requestResult).to.have.property('tripName').that.is.a('string');
        expect(requestResult).to.have.property('scenes').that.is.an('array');
        expect(requestResult).to.have.property('routes').that.is.an('array');
    });

    it('The routes array should be empty or valid', function () {
        expect(requestResult.routes).to.be.an('array');
    });
});
