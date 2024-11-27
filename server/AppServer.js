"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var App_1 = require("./App");
dotenv.config();
var port = process.env.PORT;
var dbUser = process.env.DB_USER;
var dbPassword = process.env.DB_PASSWORD;
var mongoDBConnection = 'mongodb://' + dbUser + ':' + encodeURIComponent(dbPassword) + process.env.DB_INFO;
console.log("server db connection URL " + mongoDBConnection);
var server = new App_1.App(mongoDBConnection).expressApp;
server.listen(port);
console.log("server running in port " + port);

// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var dotenv = require("dotenv");
// var App_1 = require("./App");
// dotenv.config();

// var port = process.env.PORT;
// var dbUser = process.env.DB_USER;
// var dbPassword = process.env.DB_PASSWORD;
// var dbProtocol = process.env.DB_PROTOCOL;  // 从 .env 中获取 DB_PROTOCOL         // 从 .env 中获取 DB_INFO

// // 构建MongoDB连接字符串
// var mongoDBConnection = dbProtocol + dbUser + ':' + encodeURIComponent(dbPassword) + process.env.DB_INFO;
// console.log("server db connection URL " + mongoDBConnection);

// var server = new App_1.App(mongoDBConnection).expressApp;
// server.listen(port);
// console.log("server running in port " + port);
