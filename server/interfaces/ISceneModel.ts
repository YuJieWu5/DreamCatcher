import Mongoose = require("mongoose");

interface ISceneModel extends Mongoose.Document {
    sceneId: string;
    sceneName: string;
    address: string;
    mediaName: string;
    type: string;
    description: string;
    review: string[];
}
export {ISceneModel};