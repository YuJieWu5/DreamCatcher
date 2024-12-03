import * as express from 'express';
import * as bodyParser from 'body-parser';
import { SceneModel } from './model/SceneModel';
import { UserModel } from './model/UserModel';
import { TripModel } from './model/TripModel';
import { ReviewModel } from './model/ReviewModel';
import * as crypto from 'crypto';
import * as passport from 'passport';
import GooglePassport from './GooglePassport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

declare global {
  namespace Express {
    interface User {
      userId: string;
      userName: string;
      email: string;
      authorization: string;
      // Add any other fields your user object contains
    }

    interface Request {
      user?: User; // Include user from Passport
      logout(callback: (err: unknown) => void): void; // Add logout method
      // Add session if needed in the future
    }
  }
}

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Scenes: SceneModel;
  public Users: UserModel;
  public Trips: TripModel;
  public Reviews: ReviewModel;
  public googlePassportObj:GooglePassport;

  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection: string) {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Scenes = new SceneModel(mongoDBConnection);
    this.Users = new UserModel(mongoDBConnection);
    this.Trips = new TripModel(mongoDBConnection);
    this.Reviews = new ReviewModel(mongoDBConnection);
    this.googlePassportObj = new GooglePassport(this.Users, this.Trips);
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));

    this.expressApp.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    this.expressApp.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false, cookie: {secure: false}}));
    this.expressApp.use(cookieParser());
    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());
  }

  private validateAuth(req, res, next):void {
    if (req.isAuthenticated()) {
      console.log("user is authenticated");
      console.log('validateAuth: '+JSON.stringify(req.user.id));
      return next(); 
    }
    console.log("user is not authenticated");
    res.redirect('/');
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get('/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']}));

    router.get('/auth/google/callback',
      passport.authenticate('google',
        { failureRedirect: '/' }
      ),
      (req, res) => {
        console.log("successfully authenticated user and returned to callback page.");
        console.log("redirecting to /#/user");
        res.redirect('/#/user');
      }
    );

    // Logout route
    router.get('/logout', this.validateAuth, (req, res) => {
      req.logout((err) => {
        if (err) {
          console.error('Error during logout:', err);
          return res.status(500).json({ success: false, message: 'Logout failed', error: err });
        }
        res.clearCookie('connect.sid'); // Replace with your session cookie name
        console.log('User logged out successfully');
        res.status(200).json({ success: true, message: 'Logged out successfully' });
      });
    });



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

    //get user info by userId
    router.get('/app/user', this.validateAuth, async (req, res) => {
      try {
          // Retrieve the userId from the session (req.user)
          console.log('user authorization: '+ req.user.authorization);
          const userId = req.user.userId; // Assuming `userId` is part of the user object in req.user
          console.log('Querying single user with id: ' + userId);
  
          // Fetch user info from the database
          await this.Users.retrieveUser(res, userId);
      } catch (error) {
          console.error("Error fetching user info:", error);
          res.status(500).json({ success: false, message: "An error occurred", error });
      }
    });

    //get user count
    router.get('/app/usercount', async (req, res) => {
      console.log('Query the number of users in db');
      await this.Users.retrieveUserCount(res);
    });

    //update user(phone || email || name) by userId
    router.patch('/app/user/update', this.validateAuth, async (req, res) => {
      // const userId = req.params.userId;
      const userId = req.user.userId;
      console.log('update by userId: ' + userId);
      const updateData = req.body; // e.g., { userName, phone, email })
      try {
        await this.Users.updateUserById(res, userId, updateData);
      } catch (e) {
        console.error(e);
      }
    });

    //get user all favorite list
    router.get('/app/user/favoritelist', this.validateAuth, async (req, res) => {
      const userId = req.user.userId;
      const authorization = req.user.authorization;
      console.log('update by userId: ' + userId);
      await this.Users.retrieveFavoriteList(res, userId, authorization);
    });

    //get user's one favorite list by favListId & userId
    router.get('/app/user/favoritelist/:favListId', this.validateAuth, async (req, res) => {
      const id = req.user.userId;
      var listId = req.params.favListId;
      console.log('Query single user with id: ' + id + " and listId:" + listId);
      await this.Users.retrieveFavoriteListByListId(res, id, listId);
    });

    //add scene to user favorite list
    router.patch('/app/user/addscene', this.validateAuth, async (req, res) => {
      try {
        const userId = req.user.userId;
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
    router.delete('/app/user/list/:listId/deletescene/:sceneId', this.validateAuth, async (req, res) => {
      try {
        const userId = req.user.userId;
        const { listId, sceneId } = req.params;
        await this.Users.deleteSceneFromFavoriteList(res, userId, listId, sceneId);
      }
      catch (e) {
        console.error(e);
        console.log('delete scene failed');
      }
    });

    //create favorite list
    router.post('/app/user/addList', this.validateAuth, async (req, res) => {
      try {
        const userId = req.user.userId;
        const { listName } = req.body;
        await this.Users.createFavoriteList(res, userId, listName);
      } catch (e) {
        console.log(e);
        console.log('create favorite failed');
      }
    });

    //delete favorite list
    router.delete('/app/user/deleteList/:listId', this.validateAuth, async (req, res) => {
      try {
        const userId = req.user.userId;
        const { listId } = req.params;
        console.log(userId + " , " + listId);
        await this.Users.deleteFavoriteList(res, userId, listId);
      }
      catch (e) {
        console.error(e);
        console.log('delete favorite list failed');
      }
    });

    /*API for Trips*/

    //create new trip
    router.post('/app/trip', this.validateAuth, async (req, res) => {
      const userId = req.user.userId;
      const id = crypto.randomBytes(16).toString("hex");
      var jsonObj = req.body;
      jsonObj.tripId = id;
      jsonObj.userId = userId;
      console.log(req.body);
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
    router.get('/app/user/trip', this.validateAuth, async (req, res) => {
      const userId = req.user.userId;
      const authorization = req.user.authorization;
      console.log('query trips by userId: ' + userId);
      await this.Trips.retrieveTrips(res, userId, authorization);
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
        await this.Trips.updateTripScenes(res, tripId, updateData);
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
    this.expressApp.use('/', express.static(__dirname + '/dist'));

  }

}

export { App };