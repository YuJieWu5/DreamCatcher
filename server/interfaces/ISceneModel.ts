import Mongoose = require("mongoose");

interface ISceneModel extends Mongoose.Document {
    sceneId: string;
    sceneName: string;
    address: string;
    mediaName: string;
    url: String; 
    lat: number; 
    lng:number;
    type: string;
    description: string;
}
export {ISceneModel};