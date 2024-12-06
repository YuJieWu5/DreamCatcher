import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Test Add Review', function () {
    const baseUrl = 'https://dream-catcher2024.azurewebsites.net';
    // const baseUrl = 'http://localhost:8080'; 
    const validSceneId = "32ab8a17-e92a-4b0d-a42f-ca5e5537db65"; 
    const TestReview = {
        sceneId: validSceneId,
        rating: 5,
        comment: "This is a wonderful place to visit!"
    };
    let response;

    it('Should successfully add a review', function (done) {
        chai.request(baseUrl)
            .post('/app/review') 
            .send(TestReview)
            .end(function (err, res) {
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200); 
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('success', true);
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('sceneId', TestReview.sceneId);
                expect(res.body.data).to.have.property('rating', TestReview.rating);
                expect(res.body.data).to.have.property('comment', TestReview.comment);
                done();
            });
    });

    it('Should validate the added review', function (done) {
        chai.request(baseUrl)
            .get(`/app/review/${validSceneId}`)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('success', true);
                expect(res.body.data).to.be.an('array');

                const addedReview = res.body.data.find(review => review.comment === TestReview.comment);
                expect(addedReview).to.exist;
                expect(addedReview).to.have.property('sceneId', TestReview.sceneId);
                expect(addedReview).to.have.property('rating', TestReview.rating);
                expect(addedReview).to.have.property('comment', TestReview.comment);

                done();
            });
    });
});
