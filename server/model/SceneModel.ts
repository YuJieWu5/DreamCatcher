import * as Mongoose from "mongoose";
import {ISceneModel} from '../interfaces/ISceneModel';

class SceneModel {
    public schema:any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                sceneId: String,
                sceneName: String,
                street: String,
                city: String,
                state: String,
                postalCode: String,
                country: String,
                mediaName: String,
                type: String,
                description: String,
                review: [String]
            }, {collection: 'scenes'}
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<ISceneModel>("Scenes", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveAllScenes(response:any) {
        var query = this.model.find({});
        try {
            const itemArray = await query.exec();
            response.json(itemArray);
        }
        catch(e) {
            console.error(e);
        }
    }

    public async retrieveScenes(response:any, value:string) {
        var query = this.model.findOne({sceneId: value});
        try {
            const result = await query.exec();
            response.json(result) ;
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveSceneCount(response:any) {
        console.log("retrieve Scene Count ...");
        var query = this.model.estimatedDocumentCount();
        try {
            const numberOfScenes = await query.exec();
            console.log("numberOfScenes: " + numberOfScenes);
            response.json(numberOfScenes);
        }
        catch (e) {
            console.error(e);
        }
    }

    // delete a scene by sceneId
    public async deleteSceneById(response: any, sceneId: string) {
        try {
            const result = await this.model.deleteOne({ sceneId: sceneId });
            if (result.deletedCount > 0) {
                response.status(200).json({ message: 'Scene deleted successfully' });
            } else {
                response.status(404).json({ message: 'Scene not found' });
            }
        }
        catch (e) {
            console.error(e);
        }
    }
}
export {SceneModel};