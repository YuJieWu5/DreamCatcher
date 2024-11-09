import * as express from 'express';
// import express from 'express';
import * as bodyParser from 'body-parser';
import {SceneModel} from './model/SceneModel';
import {UserModel} from './model/UserModel';
import * as crypto from 'crypto';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Scenes:SceneModel;
  public Users:UserModel;

  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection:string)
  {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Scenes = new SceneModel(mongoDBConnection);
    this.Users = new UserModel(mongoDBConnection);
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use( (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

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
          res.send('{"id":"' + id + '"}');
        }
        catch (e) {
          console.error(e);
          console.log('object creation failed');
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

    //endpoint for user//

    //create a new user
    router.post('/app/user/', async (req, res) => {
      const id = crypto.randomBytes(16).toString("hex");
      var jsonObj = req.body;
      jsonObj.userId = id;
      console.log(req.body);
      try {
        await this.Users.model.create([jsonObj]);
        res.send('{"id":"' + id + '"}');
      }
      catch (e) {
        console.error(e);
        console.log('object creation failed');
      }
    });

    //get scene by userId
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
      try{
        await this.Users.updateUserById(res, userId, updateData);
      }catch(e){
        console.error(e);
      }
    });

    //get user favorite list
    router.get('/app/user/:userId/favoritelist', async (req, res) => {
      console.log('Query the favoritelist by userID YAY');
      var id = req.params.userId;
      console.log('Query single user with id: ' + id);
      await this.Users.retrieveFavoriteList(res, id);
    });

    //add scene to user favorite list
    router.patch('/app/user/:userId/addscene', async (req, res) => {  
      try {
        const userId = req.params.userId;
        const{ sceneId } = req.body;
        await this.Users.addSceneToFavorites(res, userId, sceneId);
      }
      catch (e) {
        console.error(e);
        console.log('add scene failed');
      }
    });

    //delete scene to user favorite list
    router.patch('/app/user/:userId/deletescene', async (req, res) => {
      try {
        const userId = req.params.userId;
        const{ sceneId } = req.body;
        await this.Users.deleteSceneFromFavoriteList(res, userId, sceneId);
      }
      catch (e) {
        console.error(e);
        console.log('delete scene failed');
      }
    });
  

    this.expressApp.use('/', router);

    // this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    // this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
    
  }

}

export {App};