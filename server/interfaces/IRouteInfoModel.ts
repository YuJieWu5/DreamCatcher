import Mongoose = require("mongoose");

interface IRouteInfoModel extends Mongoose.Document {
    transportation: string;
    distance: number;
    travelTime: number;
}
export {IRouteInfoModel};