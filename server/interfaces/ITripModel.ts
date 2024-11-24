import Mongoose = require("mongoose");
import { IRouteInfoModel } from "./IRouteInfoModel";

interface ITripModel extends Mongoose.Document {
    tripId: string;
    userId: string;
    tripName: string;
    scenes: string[];
    routes: IRouteInfoModel[];
}
export {ITripModel};