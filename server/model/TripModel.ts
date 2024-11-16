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
                tripName: { type: String, required: true },
                phone: { type: Number, required: true },
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

    //should check if routeSchema is empty or not
    //if isEmpty, called google map api to get the info
    //add the info to json then return to user
    public async retrieveUser(response:any, value:string) {
        var query = this.model.findOne({tripId: value});
        try {
            const result = await query.exec();
            response.json(result) ;
        }
        catch (e) {
            console.error(e);
        }
    }

}

export {TripModel};