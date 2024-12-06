import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Test Single User result', function () {
    var requestResult;
    var response;
    const baseUrl = 'https://dream-catcher2024.azurewebsites.net';
    // const baseUrl = 'http://localhost:8080';
    const validUserId = "115756618068685535983"; 

    before(function (done) {
        chai.request(baseUrl)
            .get(`/app/unprotected/user/${validUserId}`)
            .end(function (err, res) {
                requestResult = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    
    it('The user object has known properties', function () {
        expect(requestResult).to.have.property('_id'); 
        expect(response.body).to.have.deep.property('userId'); 
        expect(response.body).to.not.be.a.string;
    });

    it('The user object has all required properties and the properties conform to the data type', function () {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('userId', validUserId);
        expect(response.body).to.have.property('userName').that.is.a('string');
        expect(response.body).to.have.property('email').that.is.a('string');
        expect(response.body).to.have.property('phone').that.is.a('number');
        expect(response.body).to.have.property('favoriteList').that.is.an('array');
    });


    it('The user\'s favoriteList valid and has all required properties', function () {
        expect(requestResult.favoriteList).to.be.an('array');
        if (requestResult.favoriteList.length > 0) {
            expect(requestResult.favoriteList[0]).to.have.property('favListId').that.is.a('string');
            expect(requestResult.favoriteList[0]).to.have.property('listName').that.is.a('string');
            expect(requestResult.favoriteList[0]).to.have.property('scenes').that.is.an('array');
        }
    });
});
