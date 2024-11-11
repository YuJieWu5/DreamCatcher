"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var Mongoose = require("mongoose");
var crypto = require("crypto");
var UserModel = /** @class */ (function () {
    function UserModel(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    UserModel.prototype.createSchema = function () {
        this.favListSchema = new Mongoose.Schema({
            favListId: { type: String, require: true, unique: true },
            listName: { type: String, required: true },
            scenes: { type: [String], default: [] }
        });
        this.schema = new Mongoose.Schema({
            userId: { type: String, required: true, unique: true },
            userName: { type: String, required: true },
            phone: { type: Number, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
            authorization: { type: String, required: true },
            favoriteList: { type: [this.favListSchema], default: [] }
        }, { collection: 'users', strict: false, versionKey: false });
        //add a pre-save hook to generate default favorite list if not provided
        this.schema.pre('save', function (next) {
            if (this.favoriteList.length === 0) {
                var id = crypto.randomBytes(16).toString("hex");
                this.favoriteList.push({
                    favListId: id,
                    listName: "Default",
                    scenes: []
                });
            }
            next();
        });
    };
    UserModel.prototype.createModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Mongoose.connect(this.dbConnectionString, { serverSelectionTimeoutMS: 20000 })];
                    case 1:
                        _a.sent();
                        this.model = Mongoose.model("Users", this.schema);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.retrieveUser = function (response, value) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.findOne({ userId: value });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        result = _a.sent();
                        response.json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.retrieveUserCount = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var query, numberOfScenes, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("retrieve User Count ...");
                        query = this.model.estimatedDocumentCount();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        numberOfScenes = _a.sent();
                        console.log("numberOfUsers: " + numberOfScenes);
                        response.json(numberOfScenes);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // update userName, phone, or email by userId
    UserModel.prototype.updateUserById = function (response, userId, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOneAndUpdate({ userId: userId }, // filter by userId
                            { $set: updateData }, // update specific fields
                            { new: true } //new=true returns updated document
                            )];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            response.status(200).json({ message: 'User updated successfully', data: result });
                        }
                        else {
                            response.status(404).json({ message: 'User not found' });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        console.error(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //FUNCTION REGARDING FAVORITE LIST
    //get all favorite list data
    UserModel.prototype.retrieveFavoriteList = function (response, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Model reveived userId:" + userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.model.findOne({ userId: userId }).lean().exec()];
                    case 2:
                        result = _a.sent();
                        console.log(result === null || result === void 0 ? void 0 : result.favoriteList);
                        //return scenes or an empty array if no result is found
                        response.status(200).json({ success: true, favoriteList: (result === null || result === void 0 ? void 0 : result.favoriteList) || [] });
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        console.error(e_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //get one favorite list data by listId
    UserModel.prototype.retrieveFavoriteListByListId = function (response, userId, favListId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Find favorite data by userId: " + userId + " and favListId: " + favListId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.model.findOne({ userId: userId, "favoriteList.favListId": favListId }).lean().exec()];
                    case 2:
                        result = _a.sent();
                        console.log(result === null || result === void 0 ? void 0 : result.favoriteList);
                        if (result && result.favoriteList) {
                            response.status(200).json({ success: true, favoriteList: result.favoriteList });
                        }
                        else {
                            response.status(404).json({ success: false, message: 'Favorite list not found' });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        console.error(e_6);
                        response.status(500).json({ success: false, message: 'An error occurred', error: e_6 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //add sceneId to favoriteList
    UserModel.prototype.addSceneToFavorites = function (response, userId, favListId, sceneId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, updatedUser, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        console.log('User ID:', userId, ' List ID:', favListId, ' Scene ID:', sceneId);
                        return [4 /*yield*/, this.model.updateOne({ userId: userId, "favoriteList.favListId": favListId }, { $addToSet: { "favoriteList.$.scenes": sceneId } })];
                    case 1:
                        result = _a.sent();
                        if (!(result.modifiedCount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.model.findOne({ userId: userId })];
                    case 2:
                        updatedUser = _a.sent();
                        if (updatedUser) {
                            response.status(200).json({
                                message: sceneId + ' added to ' + favListId,
                                favoriteList: updatedUser.favoriteList
                            });
                        }
                        else {
                            response.status(404).json({ message: 'User not found after update' });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        response.status(404).json({ message: 'User not found or SceneId already in favoriteList' });
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_7 = _a.sent();
                        console.error(e_7);
                        response.status(500).json({ success: false, message: 'An error occurred', error: e_7 });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // delete a sceneId from favoriteList
    UserModel.prototype.deleteSceneFromFavoriteList = function (response, userId, favListId, sceneId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, updatedUser, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        console.log('User ID:', userId, ' List ID:', favListId, ' Scene ID:', sceneId);
                        return [4 /*yield*/, this.model.updateOne({ userId: userId, "favoriteList.favListId": favListId }, { $pull: { "favoriteList.$.scenes": sceneId } })];
                    case 1:
                        result = _a.sent();
                        if (!(result.modifiedCount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.model.findOne({ userId: userId })];
                    case 2:
                        updatedUser = _a.sent();
                        if (updatedUser) {
                            response.status(200).json({
                                message: sceneId + ' deleted from ' + favListId,
                                favoriteList: updatedUser.favoriteList
                            });
                        }
                        else {
                            response.status(404).json({ message: 'User not found after update' });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        response.status(404).json({ message: 'User not found or SceneId already in favoriteList' });
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_8 = _a.sent();
                        console.error(e_8);
                        response.status(500).json({ success: false, message: 'An error occurred', error: e_8 });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserModel;
}());
exports.UserModel = UserModel;
