"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const Mongoose = __importStar(require("mongoose"));
class ReviewModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            sceneId: { type: String, required: true },
            userId: { type: String, required: true },
            userName: { type: String, required: true },
            rating: { type: Number, required: true, min: 1, max: 5 },
            comment: { type: String, required: true },
            commentTime: { type: Date, default: Date.now }
        }, { collection: "reviews", versionKey: false });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.models.Reviews || Mongoose.model("Reviews", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    addReviews(response, reviewData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.model) {
                    throw new Error("Review model not initialized");
                }
                const wordLimit = 50;
                // Split the comment by spaces and count words
                const words = reviewData.comment.trim().split(/\s+/);
                if (words.length > wordLimit) {
                    response.status(400).json({
                        success: false,
                        message: `Comment cannot exceed ${wordLimit} words. You entered ${words.length} words.`
                    });
                    return;
                }
                const newReview = new this.model(reviewData);
                const savedReview = yield newReview.save();
    
                // No longer calculating average rating, removing related logic
                response.status(201).json({ success: true, data: savedReview });
            }
            catch (e) {
                console.error("Error adding review:", e);
                response.status(500).json({ success: false, message: "Failed to add review", error: e });
            }
        });
    }
    
    retrieveReviewsBySceneId(response, sceneId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield this.model.find({ sceneId }).exec();
                if (reviews.length > 0) {
                    response.status(200).json({ success: true, data: reviews });
                }
                else {
                    response.status(404).json({ success: false, message: "No reviews found for this scene." });
                }
            }
            catch (e) {
                console.error("Error retrieving reviews:", e);
                response.status(500).json({ success: false, message: "Failed to retrieve reviews", error: e });
            }
        });
    }
    
}
exports.ReviewModel = ReviewModel;
//# sourceMappingURL=ReviewModel.js.map