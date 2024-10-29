import Mongoose = require("mongoose");

interface ISceneModel extends Mongoose.Document {
    sceneId: string;
    sceneName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    mediaName: string;
    type: string;
    description: string;
    review: string[];
}
export {ISceneModel};