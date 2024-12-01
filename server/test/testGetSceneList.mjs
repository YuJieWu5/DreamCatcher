import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

// const { assert, expect, should } = chai;
chai.use(chaiHttp);

describe('Test Scenes result', function () {

	var requestResult;
	var response;
		 
    before(function (done) {
        chai.request("http://localhost:8080")
			.get("/app/scene")
			.end(function (err, res) {
				requestResult = res.body.data;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    it('Should return an array with more than 2 scenes', function (){
		expect(response).to.have.status(200);
		expect(response.body.data).to.be.an('array');
		expect(response.body.data).to.have.length.above(2);
		expect(response).to.have.headers;
    });
    
	it('The first scene in the array has known properties', function(){
	    expect(requestResult[0]).to.include.keys('sceneName');
	    expect(requestResult[0]).to.have.property('_id');
		expect(requestResult[0]).to.have.deep.property('sceneId');
		expect(requestResult).to.not.be.a.string;
	});

	it('The scene in the array have the expected properties', function(){
		expect(requestResult).to.have.length(12);
		expect(requestResult).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('sceneId').that.is.a('string');
					expect(body[i]).to.have.property('sceneName').that.is.a('string');
					expect(body[i]).to.have.property('address').that.is.a('string');
					expect(body[i]).to.have.property('mediaName').that.is.a('string');
					expect(body[i]).to.have.property('url').that.is.a('string');
					expect(body[i]).to.have.property('lat').that.is.a('number');
					expect(body[i]).to.have.property('lng').that.is.a('number');
                    expect(body[i]).to.have.property('type').that.is.a('string');
                    expect(body[i]).to.have.property('description').that.is.a('string');
                    expect(body[i]).to.have.property('review').that.is.an('array');
				}
				return true;
			});
	});	
	
});