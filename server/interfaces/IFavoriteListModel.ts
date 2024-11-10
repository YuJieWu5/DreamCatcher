import Mongoose = require("mongoose");

interface IFavoriteListModel extends Mongoose.Document {
    favListId: string;
    listName: string;
    scenes: string[];
}
export {IFavoriteListModel};