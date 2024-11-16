import * as express from 'express';
import * as bodyParser from 'body-parser';
import {SceneModel} from './model/SceneModel';
import {UserModel} from './model/UserModel';
import { TripModel } from './model/TripModel';
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
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
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
          res.status(200).json({message: 'scene creation success', id: id});
        }
        catch (e) {
          console.error(e);
          console.log('scene creation failed');
          res.status(404).json({message: 'scene creation failed'})
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
      console.log("passed in keyword: "+ keyword);
      await this.Scenes.searchSceneByKeyword(res, keyword);
    });

    //query scenes by sceneIds
    router.post('/app/scenes/', async(req, res) => {
      var sceneIds = req.body.scenes;
      console.log("passed in scenes: "+ sceneIds);
      await this.Scenes.getSceneBysceneIds(res, sceneIds);
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
        res.status(200).json({message: 'user creation success', id: id});
      }
      catch (e) {
        console.error(e);
        console.log('object creation failed');
        res.status(404).json({message: 'user creation failed'});
      }
    });

    router.post('/app/user/login', async(req, res)=>{
      const email = req.body.email;
      const password = req.body.password;
      try{
        await this.Users.userLogIn(res, email, password);
      }catch(e){
        console.log('log in failed')
        console.log(e);
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
      console.log('Query single user with id: ' + id+" and listId:"+ listId);
      await this.Users.retrieveFavoriteListByListId(res, id, listId);
    });

    //add scene to user favorite list
    router.patch('/app/user/:userId/addscene', async (req, res) => {  
      try {
        const userId = req.params.userId;
        const{ listId } = req.body;
        const{ sceneId } = req.body;
        await this.Users.addSceneToFavorites(res, userId, listId, sceneId);
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
        const{ listId } = req.body;
        const{ sceneId } = req.body;
        await this.Users.deleteSceneFromFavoriteList(res, userId, listId, sceneId);
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