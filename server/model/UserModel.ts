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
            }, {collection: 'users'}
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
}
export {UserModel};