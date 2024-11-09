import * as Mongoose from "mongoose";
import {IUserModel} from '../interfaces/IUserModel';

class UserModel {
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
                userId: String,
                userName: String,
                phone: Number,
                email: String,
                password: String,
                authorization: String
            }, {collection: 'users', strict: false }
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IUserModel>("Users", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveUser(response:any, value:string) {
        var query = this.model.findOne({userId: value});
        try {
            const result = await query.exec();
            response.json(result) ;
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveUserCount(response:any) {
        console.log("retrieve User Count ...");
        var query = this.model.estimatedDocumentCount();
        try {
            const numberOfScenes = await query.exec();
            console.log("numberOfUsers: " + numberOfScenes);
            response.json(numberOfScenes);
        }
        catch (e) {
            console.error(e);
        }
    }
    
    // update userName, phone, or email by userId
    public async updateUserById(response: any, userId: string, updateData: Partial<Pick<IUserModel, "userName" | "phone" | "email">>) {
        try {
            // console.log(updateData);
            const result = await this.model.findOneAndUpdate(
                { userId: userId },         // filter by userId
                { $set: updateData },       // update specific fields
                { new: true }               //new=true returns updated document
            );

            if (result) {
                response.status(200).json({ message: 'User updated successfully', data: result });
            } else {
                response.status(404).json({ message: 'User not found' });
            }
        } catch (e) {
            console.error(e);
        }
    }


    //FUNCTION REGARDING FAVORITE LIST

    //get favorite list data
    public async retrieveFavoriteList(response:any, value:string) {
        console.log("Model reveived userId:"+ value);
        try {
            const result = await this.model.findOne({ userId: value }).lean().exec();

            console.log(result?.favoriteList);
            //return scenes or an empty array if no result is found
            response.status(200).json({success: true, favoriteList: result?.favoriteList || []}); 
        } catch (e) {
            console.error(e);
        }
    }

    //add sceneId to favoriteList
    public async addSceneToFavorites(response: any, userId: string, sceneId: string) {
        try {
            console.log('User ID:', userId, ' Scene ID:', sceneId);
            
            //add sceneId to favoriteList only if not present
            const result = await this.model.updateOne(
                { userId: userId },
                { $addToSet: { favoriteList: sceneId } } 
            );

            if (result.modifiedCount > 0) {
                //fetch the updated user document to return the updated favoriteList
                const updatedUser = await this.model.findOne({ userId: userId });
                if (updatedUser) {
                    response.status(200).json({
                        message: sceneId +' added',
                        favoriteList: updatedUser.favoriteList
                    });
                } else {
                    response.status(404).json({ message: 'User not found after update' });
                }
            } else {
                response.status(404).json({ message: 'User not found or SceneId already in favoriteList' });
            }
        } catch (e) {
            console.error(e);
            response.status(500).json({ success: false, message: 'An error occurred', error: e });
        }
    }
    

    // delete a sceneId from favoriteList
    public async deleteSceneFromFavoriteList(response: any, userId: string, sceneId: string) {
        try {
            console.log('User ID:', userId, ' Scene ID:', sceneId);

            //remove sceneId from favoriteList
            const result = await this.model.updateOne(
                { userId: userId },
                { $pull: { favoriteList: sceneId } }
            );

            if (result.modifiedCount > 0) {
                //fetch the updated user document to return the updated favoriteList
                const updatedUser = await this.model.findOne({ userId: userId });
                if (updatedUser) {
                    response.status(200).json({
                        message: sceneId +' deleted',
                        favoriteList: updatedUser.favoriteList
                    });
                } else {
                    response.status(404).json({ message: 'User not found after update' });
                }
            } else {
                response.status(404).json({ message: 'User not found or SceneId already in favoriteList' });
            }
        } catch (e) {
            console.error(e);
            response.status(500).json({ success: false, message: 'An error occurred', error: e });
        }
    }
}
export {UserModel};