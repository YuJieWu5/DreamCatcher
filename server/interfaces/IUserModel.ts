import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    userId: string;
    userName: string;
    phone: number;
    email: string;
    password: string;
    authorization: string;
}
export {IUserModel};