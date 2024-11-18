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
                address: String,
                mediaName: String,
                url: String, 
                lat: Number, 
                ing: Number,
                type: String,
                description: String,
                review: [String]
            }, {collection: 'scenes',versionKey: false}
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
            response.status(200).json(itemArray);
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

    // search a scene by keyword
    public async searchSceneByKeyword(response: any, keyword: string){
        try{
            console.log(keyword);
            const result = await this.model.find({
                $or: [
                    { sceneName: { $regex: keyword, $options: 'i' } }, // 'i' for case-insensitive
                    { address: { $regex: keyword, $options: 'i' } },
                    { mediaName: { $regex: keyword, $options: 'i' } }
                ]
            });

            console.log(result);
            if (result.length > 0) {
                response.status(200).json(result);
            } else {
                response.status(404).json({ message: 'No matching scenes found' });
            }
        }catch(e){
            console.error(e);
            response.status(500).json({ success: false, message: 'An error occurred', error: e });
        }
    }

    //search by multiple sceneId
    public async getSceneBysceneIds(response: any, sceneIds: string[]) {
        try {
            const result = await this.model.find({ sceneId: { $in: sceneIds } }).exec();
            console.log(result);
            if(result.length>0){
                response.status(200).json({message: 'scenes found', data: result});
            }else{
                response.status(200).json({message: 'no scenes data', data: result});
            }
        }
        catch (e) {
            console.error(e);
            response.status(500).json({ success: false, message: 'An error occurred', error: e });
        }
    }
}
export {SceneModel};