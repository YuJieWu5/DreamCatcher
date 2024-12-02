import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Test Single Trip result', function () {
    var requestResult;
    var response;
    const validTripId = "7ddc4d5f-d84a-4930-85ba-45c06c"; 

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
        expect(response.body).to.have.property('data').that.is.an('object');
        expect(response.body.data).to.have.property('tripId', validTripId);
        expect(response).to.have.headers;
    });
    
    it('The scenes in the trip should have valid IDs', function () {
        expect(response.body.data.scenes).to.be.an('array');
        response.body.data.scenes.forEach(sceneId => {
            expect(sceneId).to.be.a('string');
        });
    });
    
    it('The trip object has known properties', function () {
        expect(response.body.data).to.include.keys('tripId', 'userId', 'tripName', 'scenes', 'routes');
        expect(response.body.data).to.have.property('tripId').that.is.a('string');
        expect(response.body.data).to.have.property('userId').that.is.a('string');
        expect(response.body.data).to.have.property('tripName').that.is.a('string');
        expect(response.body.data).to.have.property('scenes').that.is.an('array');
        expect(response.body.data).to.have.property('routes').that.is.an('array');
    });
    
    it('The routes array should be empty or valid', function () {
        expect(response.body.data.routes).to.be.an('array');
    });
    
});
