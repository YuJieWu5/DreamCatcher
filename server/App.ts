import * as express from 'express';
import * as bodyParser from 'body-parser';
import {SceneModel} from './model/SceneModel';
import * as crypto from 'crypto';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Scenes:SceneModel;

  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection:string)
  {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Scenes = new SceneModel(mongoDBConnection);
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

    router.get('/app/scene/:sceneId', async (req, res) => {
      var id = req.params.sceneId;
      console.log('Query single scene with id: ' + id);
      await this.Scenes.retrieveScenes(res, id);
    });

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

    // DELETE route for deleting a scene by sceneId
    router.delete('/app/scene/:sceneId', async (req, res) => {
        var id = req.params.sceneId;
        console.log('Attempting to delete scene with id: ' + id);
        
        try {
            await this.Scenes.deleteSceneById(res, id);
        } catch (e) {
            console.error(e);
        }
    });

    router.get('/app/scene/', async (req, res) => {
        console.log('Query All Scenes');
        await this.Scenes.retrieveAllScenes(res);
    });

    router.get('/app/scenecount', async (req, res) => {
      console.log('Query the number of list elements in db');
      await this.Scenes.retrieveSceneCount(res);
    });

    this.expressApp.use('/', router);

    // this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    // this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
    
  }

}

export {App};