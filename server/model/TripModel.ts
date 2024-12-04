import * as Mongoose from "mongoose";
import {ITripModel} from '../interfaces/ITripModel';
import * as crypto from 'crypto';

class TripModel{
    public schema:any;
    public routeSchema: any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.routeSchema = new Mongoose.Schema({
            transportation: String,
            distance: String,
            travelTime: String
        });

        this.schema = new Mongoose.Schema(
            {
                tripId: { type: String, required: true, unique: true },
                userId: { type: String, required: true },
                tripName: { type: String, required: true },
                scenes: { type: [String], required: true },
                routes: { type: [this.routeSchema], default: [] }
            }, {collection: 'trips', strict: false, versionKey: false }
        );     
        
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString,{serverSelectionTimeoutMS: 20000});
            this.model = Mongoose.model<ITripModel>("Trips", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    //get all trips by userId
    public async retrieveTrips(response:any, userId:string, authorization: string) {
        try {
            const results = await this.model.find({ userId: userId }).lean().exec();
            if (results && results.length > 0) {
                response.status(200).json({ success: true, message: 'Trips found', data: results, auth: authorization });
            } else {
                response.status(404).json({ success: false, message: 'No records found for the given userId', data: [], auth: authorization });
            }
        }
        catch (e) {
            console.error('Error finding records by userId:', e);
            response.status(500).json({ success: false, message: 'An error occurred', e });
        }
    }

    //should check if routeSchema is empty or not
    //if isEmpty, called google map api to get the info
    //add the info to json then return to user
    public async retrieveTrip(response:any, tripId:string) {
        try {
            const result = await this.model.findOne({ tripId: tripId}).exec();
            response.status(200).json({ success: true, message: 'Trip found', data: result });
        }
        catch (e) {
            console.error(e);
        }
    }

    // update trip by tripId
    public async updateTripScenes(response: any, tripId: string, updateData: Partial<Pick<ITripModel, "scenes">>) {
        try {
            const result = await this.model.findOneAndUpdate(
                { tripId: tripId },         // filter by tripId
                { $set: updateData },       // update specific fields
                { new: true }               //new=true returns updated document
            );

            if (result) {
                response.status(200).json({ success: true, message: 'Trip updated successfully', data: result });
            } else {
                response.status(404).json({ success: false, message: 'Trip not found', data: [] });
            }
        } catch (e) {
            console.error(e);
            response.status(500).json({ success: false, message: 'An error occurred', error: e });
        }
    }

    //delete trip
    public async deleteTrip(response: any, tripId: string){
        try{
            const result = await this.model.deleteOne({ tripId: tripId });
            console.log(result);
            if (result.deletedCount > 0) {
                response.status(200).json({ success: true, message: 'Trip deleted successfully' });
            } else {
                response.status(404).json({ success: false, message: 'Trip not found' });
            }
        }catch(e){
            console.error("Error deleting trip:", e);
            response.status(500).json({ success: false, message: 'An error occurred while deleting the trip', e });
        }
    }

    //add sceneId to trip
    public async addSceneTotrip(response: any, tripId: string, sceneId: string) {
        try {
            console.log(' Trip ID:', tripId, ' Scene ID:', sceneId);
            
            //add sceneId to trip only if not present
            const result = await this.model.updateOne(
                { tripId: tripId },
                { $addToSet: { scenes: sceneId } } 
            );

            if (result.modifiedCount > 0) {
                const updatedTrip = await this.model.findOne({ tripId: tripId });
                if (updatedTrip) {
                    response.status(200).json({ success: true, message: 'Scene added to trip successfully', data: updatedTrip.scenes });
                } else {
                    response.status(404).json({ success: false, message: 'Trip not found after update', data: [] });
                }
            } else {
                response.status(404).json({ success: false, message: 'Trip not found or scene already exists', data: [] });
            }
        } catch (e) {
            console.error(e);
            response.status(500).json({ success: false, message: 'An error occurred while adding the scene to the trip', e });
        }
    }
    

    // delete a sceneId from trip
    public async deleteSceneFromTrip(response: any, tripId: string, sceneId: string) {
        try {
            console.log('Trip ID:', tripId, ' Scene ID:', sceneId);
            const result = await this.model.updateOne(
                { tripId: tripId},
                { $pull: { scenes: sceneId } }
            );

            if (result.modifiedCount > 0) {
                const updatedTrip = await this.model.findOne({ tripId: tripId });
                if (updatedTrip) {
                    response.status(200).json({
                        success: true,
                        message: 'Scene deleted from trip successfully',
                        data: updatedTrip.scenes
                    });
                } else {
                    response.status(404).json({ success: false, message: 'Trip not found after update', data: [] });
                }
            } else {
                response.status(404).json({ success: false, message: 'Trip not found or sceneId not in Trip', data: [] });
            }
        } catch (e) {
            console.error(e);
            response.status(500).json({ success: false, message: 'An error occurred', error: e });
        }
    }

}

export {TripModel};