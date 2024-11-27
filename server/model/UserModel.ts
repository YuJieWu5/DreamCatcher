import * as Mongoose from "mongoose";
import {IUserModel} from '../interfaces/IUserModel';
import * as crypto from 'crypto';

class UserModel {
    public schema:any;
    public favListSchema: any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.favListSchema = new Mongoose.Schema({
            favListId: {type: String, require: true, unique: true},
            listName: { type: String, required: true },
            scenes: { type: [String], default: [] }
        });

        this.schema = new Mongoose.Schema(
            {
                userId: { type: String, required: true, unique: true },
                userName: { type: String, required: true },
                phone: { type: Number, required: true },
                email: { type: String, required: true },
                password: { type: String, required: true },
                authorization: { type: String, required: true },
                favoriteList: { type: [this.favListSchema], default: [] }
            }, {collection: 'users', strict: false, versionKey: false }
        );

        //add a pre-save hook to generate default favorite list if not provided
        this.schema.pre('save', function (next) {
            if (this.favoriteList.length === 0) {
                const id = crypto.randomBytes(16).toString("hex");
                this.favoriteList.push({
                    favListId: id,
                    listName: "Default",
                    scenes: []
                });
            }
            next();
        });        
        
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString,{serverSelectionTimeoutMS: 20000});
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

    public async userLogIn(response: any, email: string, password: string){
        try{
            const result = await this.model.findOne({email: email}).exec();
            console.log(result);
            if(result?.password===password){
                response.status(200).json({message: 'log in successfuly', id: result.userId});
            }else{
                response.status(404).json({message: 'Incorrect password or email'});
            }
        }catch(e){
            response.status(500).json({ success: false, message: 'An error occurred', error: e });
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
            response.status(500).json({ success: false, message: 'An error occurred', error: e });
        }
    }


    //FUNCTION REGARDING FAVORITE LIST

    //create new favorite list
    public async createFavoriteList(response: any, userId: string, listName: string){
        try {
            // Generate a unique favListId
            const favListId = crypto.randomBytes(16).toString("hex");
            const newFavoriteList = {
                favListId: favListId,
                listName: listName,
                scenes: []
            };
    
            // pushing the new favorite list to their favoriteList array
            const result = await this.model.updateOne(
                { userId: userId },
                { $push: { favoriteList: newFavoriteList } }
            );
            console.log(result);
            // Check if the user was found and updated
            if (result.modifiedCount > 0) {
                response.status(200).json({ success: true, message: "new list created successfully", favoriteList: newFavoriteList });
            } else {
                response.status(404).json({ success: false, message: "User not found" });
            }
        } catch (e) {
            console.error("Error creating favorite list:", e);
            response.status(500).json({ success: false, message: "An error occurred while creating the favorite list", error: e });
        }

    }

    //get all favorite list data
    public async retrieveFavoriteList(response:any, userId:string) {
        console.log("Model reveived userId:"+ userId);
        try {
            const result = await this.model.findOne({ userId: userId }).lean().exec();

            console.log(result?.favoriteList);
            //return scenes or an empty array if no result is found
            response.status(200).json({success: true, favoriteList: result?.favoriteList || []}); 
        } catch (e) {
            console.error(e);
            response.status(500).json({ success: false, message: 'An error occurred', error: e });
        }
    }

    //get one favorite list data by listId
    public async retrieveFavoriteListByListId(response:any, userId:string, favListId:string) {
        console.log("Find favorite data by userId: "+ userId + " and favListId: "+ favListId);
        try {
            const result = await this.model.findOne({ userId: userId, "favoriteList.favListId": favListId },{ "favoriteList.$": 1 }).lean().exec();

            console.log(result?.favoriteList);
            if(result && result.favoriteList){
                response.status(200).json({ success: true, message: 'Favorite list found', data: result.favoriteList });
            } else {
                response.status(404).json({ success: false, message: 'Favorite list not found', data: [] });
            }
        } catch (e) {
            console.error(e);
            response.status(500).json({ success: false, message: 'An error occurred', error: e });
        }
    }

    public async deleteFavoriteList(response: any, userId: string, favListId: string){
        try{
            const result = await this.model.updateOne(
                { userId: userId },
                { $pull: { favoriteList: { favListId: favListId } } } 
            );
            console.log(result);
            if (result.modifiedCount > 0) {
                response.status(200).json({success: true, message: `Favorite list ${favListId} deleted successfully`, id: favListId});
            } else {
                response.status(404).json({ success: false, message: "User or favorite list not found" });
            }
        }catch(e){
            console.error("Error deleting favorite list:", e);
            response.status(500).json({ success: false, message: "An error occurred while deleting the favorite list", error: e });
        }
    }

    //add sceneId to favoriteList
    public async addSceneToFavorites(response: any, userId: string, favListId: string, sceneId: string) {
        try {
            console.log('User ID:', userId, ' List ID:', favListId, ' Scene ID:', sceneId);
            
            //add sceneId to favoriteList only if not present
            const result = await this.model.updateOne(
                { userId: userId, "favoriteList.favListId": favListId },
                { $addToSet: { "favoriteList.$.scenes": sceneId } } 
            );

            if (result.modifiedCount > 0) {
                //fetch the updated user document to return the updated favoriteList
                const updatedUser = await this.model.findOne({ userId: userId });
                if (updatedUser) {
                    response.status(200).json({
                        success: true,
                        message: sceneId +' added to '+ favListId,
                        data: updatedUser.favoriteList
                    });
                } else {
                    response.status(404).json({ success: false, message: 'User not found after update', data: [] });
                }
            } else {
                response.status(404).json({ success: false, message: 'User not found or SceneId already in favoriteList', data: [] });
            }
        } catch (e) {
            console.error(e);
            response.status(500).json({ success: false, message: 'An error occurred', error: e });
        }
    }
    

    // delete a sceneId from favoriteList
    public async deleteSceneFromFavoriteList(response: any, userId: string, favListId: string, sceneId: string) {
        try {
            console.log('User ID:', userId, ' List ID:', favListId, ' Scene ID:', sceneId);

            //remove sceneId from favoriteList
            const result = await this.model.updateOne(
                { userId: userId, "favoriteList.favListId": favListId },
                { $pull: { "favoriteList.$.scenes": sceneId } }
            );

            if (result.modifiedCount > 0) {
                //fetch the updated user document to return the updated favoriteList
                const updatedUser = await this.model.findOne({ userId: userId });
                if (updatedUser) {
                    response.status(200).json({
                        success: true,
                        message: sceneId +' deleted from '+ favListId,
                        data: updatedUser.favoriteList
                    });
                } else {
                    response.status(404).json({ success: false, message: 'User not found after update', data: [] });
                }
            } else {
                response.status(404).json({ success: false, message: 'User not found or SceneId already in favoriteList', data: [] });
            }
        } catch (e) {
            console.error(e);
            response.status(500).json({ success: false, message: 'An error occurred', error: e });
        }
    }
}
export {UserModel};