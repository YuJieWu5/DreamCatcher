import Mongoose = require("mongoose");

interface IReviewModel extends Mongoose.Document {      
  sceneId: string;        
  userId: string;        
  userName: string;      
  rating: 1 | 2 | 3 | 4 | 5;      
  comment: string;      
  createdAt: Date; 
}
export {IReviewModel};
