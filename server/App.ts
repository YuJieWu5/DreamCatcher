import * as express from 'express';
import * as bodyParser from 'body-parser';
import { SceneModel } from './model/SceneModel';
import { UserModel } from './model/UserModel';
import { TripModel } from './model/TripModel';
import { ReviewModel } from './model/ReviewModel';
import * as crypto from 'crypto';
// import * as cors from 'cors';
// import * as passport from 'passport';
// import GooglePassport from './GooglePassport';
// import * as session from 'express-session';
// import * as cookieParser from 'cookie-parser';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Scenes: SceneModel;
  public Users: UserModel;
  public Trips: TripModel;
  public Reviews: ReviewModel;
  // public googlePassportObj:GooglePassport;

  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection: string) {
    // this.googlePassportObj = new GooglePassport();

    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Scenes = new SceneModel(mongoDBConnection);
    this.Users = new UserModel(mongoDBConnection);
    this.Trips = new TripModel(mongoDBConnection);
    this.Reviews = new ReviewModel(mongoDBConnection);
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    // Add CORS middleware here
    // this.expressApp.use(cors({
    //   origin: 'http://localhost:4200', // Allow requests from client-side
    //   credentials: true               // Allow cookies and authentication headers
    // }));

    this.expressApp.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    // this.expressApp.use(session({ secret: 'keyboard cat' }));
    // this.expressApp.use(cookieParser());
    // this.expressApp.use(passport.initialize());
    // this.expressApp.use(passport.session());
  }

  // private validateAuth(req, res, next):void {
  //   if (req.isAuthenticated()) {
  //     console.log("user is authenticated");
  //     console.log(JSON.stringify(req.user));
  //     return next(); }
  //   console.log("user is not authenticated");
  //   res.redirect('/');
  // }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    // router.get('/auth/google',
    // passport.authenticate('google', {scope: ['profile']}));

    // router.get('/auth/google/callback',
    //   passport.authenticate('google',
    //     { failureRedirect: '/' }
    //   ),
    //   (req, res) => {
    //     console.log("successfully authenticated user and returned to callback page.");
    //     console.log("redirecting to /#/user");
    //     res.redirect('http://localhost:4200/#/user');
    //   }
    // );

    //get scene by sceneId
    router.get('/app/scene/:sceneId', async (req, res) => {
      var id = req.params.sceneId;
      console.log('Query single scene with id: ' + id);
      await this.Scenes.retrieveScenes(res, id);
    });

    //create new scene
    router.post('/app/scene/', async (req, res) => {
      const id = crypto.randomBytes(16).toString("hex");
      console.log(req.body);
      var jsonObj = req.body;
      jsonObj.sceneId = id;
      try {
        await this.Scenes.model.create([jsonObj]);
        res.status(200).json({ message: 'scene creation success', id: id });
      }
      catch (e) {
        console.error(e);
        console.log('scene creation failed');
        res.status(404).json({ message: 'scene creation failed' })
      }
    });

    // delete scene by sceneId
    router.delete('/app/scene/:sceneId', async (req, res) => {
      var id = req.params.sceneId;
      console.log('Attempting to delete scene with id: ' + id);
      try {
        await this.Scenes.deleteSceneById(res, id);
      } catch (e) {
        console.error(e);
      }
    });

    //display all scene
    router.get('/app/scene/', async (req, res) => {
      console.log('Query All Scenes');
      await this.Scenes.retrieveAllScenes(res);
    });

    //get scene count
    router.get('/app/scenecount', async (req, res) => {
      console.log('Query the number of scene elements in db');
      await this.Scenes.retrieveSceneCount(res);
    });

    //search scene by keyword
    router.get('/app/scene/search/:keyword', async (req, res) => {
      var keyword = req.params.keyword;
      console.log("passed in keyword: " + keyword);
      await this.Scenes.searchSceneByKeyword(res, keyword);
    });

    //query scenes by sceneIds
    router.post('/app/scenes/', async (req, res) => {
      var sceneIds = req.body.scenes;
      console.log("passed in scenes: " + sceneIds);
      await this.Scenes.getSceneBysceneIds(res, sceneIds);
    });
    // add review to scene
    router.post('/app/review', async (req, res) => {
      const reviewData = req.body;
      console.log('Adding new review:', reviewData);
      await this.Reviews.addReviews(res, reviewData);
    });

    // display all reveiws by sceneId
    router.get('/app/review/:sceneId', async (req, res) => {
      const { sceneId } = req.params;
      console.log('Fetching reviews for sceneId:', sceneId);
      await this.Reviews.retrieveReviewsBySceneId(res, sceneId);
    });



    /*endpoint for user*/

    //create a new user
    router.post('/app/user/', async (req, res) => {
      const id = crypto.randomBytes(16).toString("hex");
      var jsonObj = req.body;
      jsonObj.userId = id;
      console.log(req.body);
      try {
        await this.Users.model.create([jsonObj]);
        res.status(200).json({ message: 'user creation success', id: id });
      }
      catch (e) {
        console.error(e);
        console.log('object creation failed');
        res.status(404).json({ message: 'user creation failed' });
      }
    });

    router.post('/app/user/login', async (req, res) => {
      const email = req.body.email;
      const password = req.body.password;
      try {
        await this.Users.userLogIn(res, email, password);
      } catch (e) {
        console.log('log in failed')
        console.log(e);
      }
    });

    //get user info by userId
    router.get('/app/user/:userId', async (req, res) => {
      var id = req.params.userId;
      console.log('Query single user with id: ' + id);
      await this.Users.retrieveUser(res, id);
    });

    //get user count
    router.get('/app/usercount', async (req, res) => {
      console.log('Query the number of users in db');
      await this.Users.retrieveUserCount(res);
    });

    //update user(phone || email || name) by userId
    router.patch('/app/user/:userId', async (req, res) => {
      const userId = req.params.userId;
      const updateData = req.body; // e.g., { userName, phone, email })
      try {
        await this.Users.updateUserById(res, userId, updateData);
      } catch (e) {
        console.error(e);
      }
    });

    //get user all favorite list
    router.get('/app/user/:userId/favoritelist', async (req, res) => {
      var id = req.params.userId;
      console.log('Query single user with id: ' + id);
      await this.Users.retrieveFavoriteList(res, id);
    });

    //get user's one favorite list by favListId & userId
    router.get('/app/user/:userId/favoritelist/:favListId', async (req, res) => {
      var id = req.params.userId;
      var listId = req.params.favListId;
      console.log('Query single user with id: ' + id + " and listId:" + listId);
      await this.Users.retrieveFavoriteListByListId(res, id, listId);
    });

    //add scene to user favorite list
    router.patch('/app/user/:userId/addscene', async (req, res) => {
      try {
        const userId = req.params.userId;
        const { listId } = req.body;
        const { sceneId } = req.body;
        await this.Users.addSceneToFavorites(res, userId, listId, sceneId);
      }
      catch (e) {
        console.error(e);
        console.log('add scene failed');
      }
    });

    //delete scene to user favorite list
    router.delete('/app/user/:userId/list/:listId/deletescene/:sceneId', async (req, res) => {
      try {
        const { userId, listId, sceneId } = req.params;
        await this.Users.deleteSceneFromFavoriteList(res, userId, listId, sceneId);
      }
      catch (e) {
        console.error(e);
        console.log('delete scene failed');
      }
    });

    //create favorite list
    router.post('/app/user/addList', async (req, res) => {
      try {
        const { userId, listName } = req.body;
        // console.log(userId+" , ", listName);
        await this.Users.createFavoriteList(res, userId, listName);
      } catch (e) {
        console.log(e);
        console.log('create favorite failed');
      }
    });

    //delete favorite list
    router.delete('/app/user/:userId/deleteList/:listId', async (req, res) => {
      try {
        const { userId, listId } = req.params;
        console.log(userId + " , " + listId);
        await this.Users.deleteFavoriteList(res, userId, listId);
      }
      catch (e) {
        console.error(e);
        console.log('delete favorite list failed');
      }
    });

    /*API for Trips*/
    //create new scene
    router.post('/app/trip/', async (req, res) => {
      const id = crypto.randomBytes(16).toString("hex");
      console.log(req.body);
      var jsonObj = req.body;
      jsonObj.tripId = id;
      try {
        await this.Trips.model.create([jsonObj]);
        res.status(200).json({success: true, message: 'trip creation success', id: id});
      }
      catch (e) {
        console.error(e);
        console.log('trip creation failed');
        res.status(404).json({success: false, message: 'trip creation failed'})
      }
    });

    //get all trip by userId
    router.get('/app/user/:userId/trip', async (req, res) => {
      const userId = req.params.userId;
      console.log('query trips by userId: ' + userId);
      await this.Trips.retrieveTrips(res, userId);
    });

    //get trip by tripId
    router.get('/app/trip/:tripId', async (req, res) => {
      const tripId = req.params.tripId;
      await this.Trips.retrieveTrip(res, tripId);
    });

    //update trip name
    router.patch('/app/trip/:tripId', async (req, res) => {
      const tripId = req.params.tripId;
      const updateData = req.body; // e.g., { tripName }
      try {
        await this.Trips.updateTripName(res, tripId, updateData);
      } catch (e) {
        console.error(e);
      }
    });

    //delete trip
    router.delete('/app/trip/:tripId/delete', async (req, res) => {
      try {
        const { tripId } = req.params;
        await this.Trips.deleteTrip(res, tripId);
      }
      catch (e) {
        console.error(e);
        console.log('delete scene failed');
      }
    });

    //add scene to trip
    router.patch('/app/trip/:tripId/addscene', async (req, res) => {
      try {
        const tripId = req.params.tripId;
        const { sceneId } = req.body;
        await this.Trips.addSceneTotrip(res, tripId, sceneId);
      }
      catch (e) {
        console.error(e);
        console.log('add scene failed');
      }
    });

    //delete scene from trip
    router.delete('/app/trip/:tripId/deletescene/:sceneId', async (req, res) => {
      try {
        const { tripId, sceneId } = req.params;
        await this.Trips.deleteSceneFromTrip(res, tripId, sceneId);
      }
      catch (e) {
        console.error(e);
        console.log('delete scene failed');
      }
    });



    this.expressApp.use('/', router);

    // this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    // this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname + '/pages'));

  }

}

export { App };
