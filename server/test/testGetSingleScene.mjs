import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Test Single Scene result', function () {
    var requestResult;
    var response;
    const validSceneId = "667afdf9-ef9e-42bd-88ed-4a8aa03fb030";
    const invalidSceneId = "invalid-scene-id";

    before(function (done) {
        chai.request("http://localhost:8080")
            .get(`/app/scene/${validSceneId}`)
            .end(function (err, res) {
                requestResult = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    
    it('Should return a valid scene object', function() {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('sceneId', validSceneId);
        expect(response).to.have.headers;
    });
    
    it('The scene object has known properties', function() {
        expect(requestResult).to.include.keys('sceneName');
        expect(requestResult).to.have.property('_id');
        expect(response.body).to.have.deep.property('sceneId');
        expect(response.body).to.not.be.a.string;
    });

    it('The scene object has the expected properties', function() {
        expect(response.body).to.satisfy(function(scene) {
            expect(scene).to.have.property('sceneId').that.is.a('string');
            expect(scene).to.have.property('sceneName').that.is.a('string');
            expect(scene).to.have.property('address').that.is.a('string');
            expect(scene).to.have.property('mediaName').that.is.a('string');
            expect(scene).to.have.property('url').that.is.a('string');
            expect(scene).to.have.property('lat').that.is.a('number');
            expect(scene).to.have.property('ing').that.is.a('number');
            expect(scene).to.have.property('type').that.is.a('string');
            expect(scene).to.have.property('description').that.is.a('string');
            expect(scene).to.have.property('review').that.is.an('array');
            return true;
        });
    });
    
    it('Should handle invalid scene ID correctly', function(done) {
        chai.request("http://localhost:8080")
            .get(`/app/scene/${invalidSceneId}`)
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.null;
                done();
            });
    });
});