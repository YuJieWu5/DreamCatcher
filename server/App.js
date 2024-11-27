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
exports.App = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var SceneModel_1 = require("./model/SceneModel");
var UserModel_1 = require("./model/UserModel");
var TripModel_1 = require("./model/TripModel");
var crypto = require("crypto");
// import * as cors from 'cors';
// import * as passport from 'passport';
// import GooglePassport from './GooglePassport';
// import * as session from 'express-session';
// import * as cookieParser from 'cookie-parser';
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    // public googlePassportObj:GooglePassport;
    //Run configuration methods on the Express instance.
    function App(mongoDBConnection) {
        // this.googlePassportObj = new GooglePassport();
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Scenes = new SceneModel_1.SceneModel(mongoDBConnection);
        this.Users = new UserModel_1.UserModel(mongoDBConnection);
        this.Trips = new TripModel_1.TripModel(mongoDBConnection);
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        // Add CORS middleware here
        // this.expressApp.use(cors({
        //   origin: 'http://localhost:4200', // Allow requests from client-side
        //   credentials: true               // Allow cookies and authentication headers
        // }));
        this.expressApp.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        // this.expressApp.use(session({ secret: 'keyboard cat' }));
        // this.expressApp.use(cookieParser());
        // this.expressApp.use(passport.initialize());
        // this.expressApp.use(passport.session());
    };
    // private validateAuth(req, res, next):void {
    //   if (req.isAuthenticated()) { 
    //     console.log("user is authenticated"); 
    //     console.log(JSON.stringify(req.user));
    //     return next(); }
    //   console.log("user is not authenticated");
    //   res.redirect('/');
    // }
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        // router.get('/auth/google', 
        // passport.authenticate('google', {scope: ['profile']}));
        // router.get('/auth/google/callback', 
        //   passport.authenticate('google', 
        //     { failureRedirect: '/' }
        //   ),
        //   (req, res) => {
        //     console.log("successfully authenticated user and returned to callback page.");
        //     console.log("redirecting to /#/user");
        //     res.redirect('http://localhost:4200/#/user');
        //   }
        // );
        //get scene by sceneId
        router.get('/app/scene/:sceneId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.sceneId;
                        console.log('Query single scene with id: ' + id);
                        return [4 /*yield*/, this.Scenes.retrieveScenes(res, id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //create new scene
        router.post('/app/scene/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, jsonObj, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = crypto.randomBytes(16).toString("hex");
                        console.log(req.body);
                        jsonObj = req.body;
                        jsonObj.sceneId = id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Scenes.model.create([jsonObj])];
                    case 2:
                        _a.sent();
                        res.status(200).json({ message: 'scene creation success', id: id });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        console.log('scene creation failed');
                        res.status(404).json({ message: 'scene creation failed' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        // delete scene by sceneId
        router.delete('/app/scene/:sceneId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.sceneId;
                        console.log('Attempting to delete scene with id: ' + id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Scenes.deleteSceneById(res, id)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        //display all scene
        router.get('/app/scene/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Query All Scenes');
                        return [4 /*yield*/, this.Scenes.retrieveAllScenes(res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //get scene count
        router.get('/app/scenecount', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Query the number of scene elements in db');
                        return [4 /*yield*/, this.Scenes.retrieveSceneCount(res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //search scene by keyword
        router.get('/app/scene/search/:keyword', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var keyword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyword = req.params.keyword;
                        console.log("passed in keyword: " + keyword);
                        return [4 /*yield*/, this.Scenes.searchSceneByKeyword(res, keyword)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //query scenes by sceneIds
        router.post('/app/scenes/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var sceneIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sceneIds = req.body.scenes;
                        console.log("passed in scenes: " + sceneIds);
                        return [4 /*yield*/, this.Scenes.getSceneBysceneIds(res, sceneIds)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        /*endpoint for user*/
        //create a new user
        router.post('/app/user/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, jsonObj, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = crypto.randomBytes(16).toString("hex");
                        jsonObj = req.body;
                        jsonObj.userId = id;
                        console.log(req.body);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Users.model.create([jsonObj])];
                    case 2:
                        _a.sent();
                        res.status(200).json({ message: 'user creation success', id: id });
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.error(e_3);
                        console.log('object creation failed');
                        res.status(404).json({ message: 'user creation failed' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router.post('/app/user/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var email, password, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        password = req.body.password;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Users.userLogIn(res, email, password)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        console.log('log in failed');
                        console.log(e_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        //get user info by userId
        router.get('/app/user/:userId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.userId;
                        console.log('Query single user with id: ' + id);
                        return [4 /*yield*/, this.Users.retrieveUser(res, id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //get user count
        router.get('/app/usercount', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Query the number of users in db');
                        return [4 /*yield*/, this.Users.retrieveUserCount(res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //update user(phone || email || name) by userId
        router.patch('/app/user/:userId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, updateData, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userId;
                        updateData = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Users.updateUserById(res, userId, updateData)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        console.error(e_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        //get user all favorite list
        router.get('/app/user/:userId/favoritelist', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.userId;
                        console.log('Query single user with id: ' + id);
                        return [4 /*yield*/, this.Users.retrieveFavoriteList(res, id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //get user's one favorite list by favListId & userId
        router.get('/app/user/:userId/favoritelist/:favListId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, listId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.userId;
                        listId = req.params.favListId;
                        console.log('Query single user with id: ' + id + " and listId:" + listId);
                        return [4 /*yield*/, this.Users.retrieveFavoriteListByListId(res, id, listId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //add scene to user favorite list
        router.patch('/app/user/:userId/addscene', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, listId, sceneId, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        listId = req.body.listId;
                        sceneId = req.body.sceneId;
                        return [4 /*yield*/, this.Users.addSceneToFavorites(res, userId, listId, sceneId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        console.error(e_6);
                        console.log('add scene failed');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        //delete scene to user favorite list
        router.delete('/app/user/:userId/list/:listId/deletescene/:sceneId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userId, listId, sceneId, e_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.params, userId = _a.userId, listId = _a.listId, sceneId = _a.sceneId;
                        return [4 /*yield*/, this.Users.deleteSceneFromFavoriteList(res, userId, listId, sceneId)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_7 = _b.sent();
                        console.error(e_7);
                        console.log('delete scene failed');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        //create favorite list
        router.post('/app/user/addList', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userId, listName, e_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, userId = _a.userId, listName = _a.listName;
                        // console.log(userId+" , ", listName);
                        return [4 /*yield*/, this.Users.createFavoriteList(res, userId, listName)];
                    case 1:
                        // console.log(userId+" , ", listName);
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _b.sent();
                        console.log(e_8);
                        console.log('create favorite failed');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        //delete favorite list
        router.delete('/app/user/:userId/deleteList/:listId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userId, listId, e_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.params, userId = _a.userId, listId = _a.listId;
                        console.log(userId + " , " + listId);
                        return [4 /*yield*/, this.Users.deleteFavoriteList(res, userId, listId)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_9 = _b.sent();
                        console.error(e_9);
                        console.log('delete favorite list failed');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        /*API for Trips*/
        //create new scene
        router.post('/app/trip/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, jsonObj, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = crypto.randomBytes(16).toString("hex");
                        console.log(req.body);
                        jsonObj = req.body;
                        jsonObj.tripId = id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Trips.model.create([jsonObj])];
                    case 2:
                        _a.sent();
                        res.status(200).json({ message: 'trip creation success', id: id });
                        return [3 /*break*/, 4];
                    case 3:
                        e_10 = _a.sent();
                        console.error(e_10);
                        console.log('trip creation failed');
                        res.status(404).json({ message: 'trip creation failed' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        //get all trip by userId
        router.get('/app/user/:userId/trip', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userId;
                        console.log('query trips by userId: ' + userId);
                        return [4 /*yield*/, this.Trips.retrieveTrips(res, userId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //get trip by tripId
        router.get('/app/trip/:tripId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tripId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tripId = req.params.tripId;
                        return [4 /*yield*/, this.Trips.retrieveTrip(res, tripId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //update trip name
        router.patch('/app/trip/:tripId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tripId, updateData, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tripId = req.params.tripId;
                        updateData = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Trips.updateTripName(res, tripId, updateData)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_11 = _a.sent();
                        console.error(e_11);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        //delete trip
        router.delete('/app/trip/:tripId/delete', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tripId, e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tripId = req.params.tripId;
                        return [4 /*yield*/, this.Trips.deleteTrip(res, tripId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_12 = _a.sent();
                        console.error(e_12);
                        console.log('delete scene failed');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        //add scene to trip
        router.patch('/app/trip/:tripId/addscene', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tripId, sceneId, e_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tripId = req.params.tripId;
                        sceneId = req.body.sceneId;
                        return [4 /*yield*/, this.Trips.addSceneTotrip(res, tripId, sceneId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_13 = _a.sent();
                        console.error(e_13);
                        console.log('add scene failed');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        //delete scene from trip
        router.delete('/app/trip/:tripId/deletescene/:sceneId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, tripId, sceneId, e_14;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.params, tripId = _a.tripId, sceneId = _a.sceneId;
                        return [4 /*yield*/, this.Trips.deleteSceneFromTrip(res, tripId, sceneId)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_14 = _b.sent();
                        console.error(e_14);
                        console.log('delete scene failed');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.expressApp.use('/', router);
        // this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
        // this.expressApp.use('/images', express.static(__dirname+'/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    };
    return App;
}());
exports.App = App;
