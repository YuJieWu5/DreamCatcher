import Mongoose = require("mongoose");
import { IFavoriteListModel } from "./IFavoriteListModel";

interface IUserModel extends Mongoose.Document {
    userId: string;
    userName: string;
    phone: number;
    email: string;
    authorization: string;
    favoriteList: IFavoriteListModel[];
}
export {IUserModel};