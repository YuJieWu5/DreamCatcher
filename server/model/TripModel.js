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
exports.TripModel = void 0;
var Mongoose = require("mongoose");
var TripModel = /** @class */ (function () {
    function TripModel(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    TripModel.prototype.createSchema = function () {
        this.routeSchema = new Mongoose.Schema({
            transportation: String,
            distance: String,
            travelTime: String
        });
        this.schema = new Mongoose.Schema({
            tripId: { type: String, required: true, unique: true },
            userId: { type: String, required: true },
            tripName: { type: String, required: true },
            scenes: { type: [String], required: true },
            routes: { type: [this.routeSchema], default: [] }
        }, { collection: 'trips', strict: false, versionKey: false });
    };
    TripModel.prototype.createModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Mongoose.connect(this.dbConnectionString, { serverSelectionTimeoutMS: 20000 })];
                    case 1:
                        _a.sent();
                        this.model = Mongoose.model("Trips", this.schema);
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
    //get all trips by userId
    TripModel.prototype.retrieveTrips = function (response, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find({ userId: userId }).lean().exec()];
                    case 1:
                        results = _a.sent();
                        if (results && results.length > 0) {
                            response.status(200).json({ success: true, message: 'Trips found', data: results });
                        }
                        else {
                            response.status(404).json({ success: false, message: 'No records found for the given userId', data: [] });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.error('Error finding records by userId:', e_2);
                        response.status(500).json({ success: false, message: 'An error occurred', e: e_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //should check if routeSchema is empty or not
    //if isEmpty, called google map api to get the info
    //add the info to json then return to user
    TripModel.prototype.retrieveTrip = function (response, tripId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne({ tripId: tripId }).exec()];
                    case 1:
                        result = _a.sent();
                        response.status(200).json({ success: true, message: 'Trip found', data: result });
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // update trip name by tripId
    TripModel.prototype.updateTripName = function (response, tripId, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOneAndUpdate({ tripId: tripId }, // filter by tripId
                            { $set: updateData }, // update specific fields
                            { new: true } //new=true returns updated document
                            )];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            response.status(200).json({ message: 'Trip updated successfully', data: result });
                        }
                        else {
                            response.status(404).json({ message: 'Trip not found', data: [] });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        console.error(e_4);
                        response.status(500).json({ success: false, message: 'An error occurred', error: e_4 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //delete trip
    TripModel.prototype.deleteTrip = function (response, tripId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.deleteOne({ tripId: tripId })];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result.deletedCount > 0) {
                            response.status(200).json({ success: true, message: 'Trip deleted successfully' });
                        }
                        else {
                            response.status(404).json({ success: false, message: 'Trip not found' });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        console.error("Error deleting trip:", e_5);
                        response.status(500).json({ success: false, message: 'An error occurred while deleting the trip', e: e_5 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //add sceneId to trip
    TripModel.prototype.addSceneTotrip = function (response, tripId, sceneId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, updatedTrip, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        console.log(' Trip ID:', tripId, ' Scene ID:', sceneId);
                        return [4 /*yield*/, this.model.updateOne({ tripId: tripId }, { $addToSet: { scenes: sceneId } })];
                    case 1:
                        result = _a.sent();
                        if (!(result.modifiedCount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.model.findOne({ tripId: tripId })];
                    case 2:
                        updatedTrip = _a.sent();
                        if (updatedTrip) {
                            response.status(200).json({ success: true, message: 'Scene added to trip successfully', data: updatedTrip.scenes });
                        }
                        else {
                            response.status(404).json({ success: false, message: 'Trip not found after update', data: [] });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        response.status(404).json({ success: false, message: 'Trip not found or scene already exists', data: [] });
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_6 = _a.sent();
                        console.error(e_6);
                        response.status(500).json({ success: false, message: 'An error occurred while adding the scene to the trip', e: e_6 });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // delete a sceneId from trip
    TripModel.prototype.deleteSceneFromTrip = function (response, tripId, sceneId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, updatedTrip, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        console.log('Trip ID:', tripId, ' Scene ID:', sceneId);
                        return [4 /*yield*/, this.model.updateOne({ tripId: tripId }, { $pull: { scenes: sceneId } })];
                    case 1:
                        result = _a.sent();
                        if (!(result.modifiedCount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.model.findOne({ tripId: tripId })];
                    case 2:
                        updatedTrip = _a.sent();
                        if (updatedTrip) {
                            response.status(200).json({
                                success: true,
                                message: 'Scene deleted from trip successfully',
                                data: updatedTrip.scenes
                            });
                        }
                        else {
                            response.status(404).json({ success: false, message: 'Trip not found after update', data: [] });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        response.status(404).json({ success: false, message: 'Trip not found or sceneId not in Trip', data: [] });
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
    return TripModel;
}());
exports.TripModel = TripModel;
