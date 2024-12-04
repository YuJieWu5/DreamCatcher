import * as Mongoose from "mongoose";
import {IReviewModel} from '../interfaces/IReviewModel';

class ReviewModel {
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
                sceneId:{ type: String, required: true },
                rating: { type: Number, required: true, min: 1, max: 5 }, 
                comment: { type: String, required: true },
                commentTime: { type: Date, default: Date.now }
            }, { collection: "reviews", versionKey: false } 
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IReviewModel>("Reviews", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveReviewsBySceneId(response: any, sceneId: string) {
        try {
            const reviews = await this.model.find({ sceneId }).exec();
            if (reviews.length > 0) {
                response.status(200).json({ success: true, data: reviews });
            } else {
                response.status(404).json({ success: false, message: "No reviews found for this scene." });
            }
        } catch (e) {
            console.error("Error retrieving reviews:", e);
            response.status(500).json({ success: false, message: "Failed to retrieve reviews", error: e });
        }
    
    }

}
export { ReviewModel }