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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
var db_1 = require("./db");
require("dotenv").config();
var cors = require("cors");
var path = require("path");
var express = require("express");
var jsonParser = express.json();
var app = express();
app.use(cors());
(0, db_1.connect)();
var corsReq = cors();
// GET - request----------------------------------------------
//get users list
app.get("/api/users", corsReq, function (req, res) {
    try {
        var getAllUser = function () { return __awaiter(void 0, void 0, void 0, function () {
            var allUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.User.findAll()];
                    case 1:
                        allUsers = _a.sent();
                        res.send(allUsers);
                        return [2 /*return*/];
                }
            });
        }); };
        getAllUser();
    }
    catch (err) {
        res.status(400).send(err);
    }
});
// POST - request---------------------------------------------
//login
app.post("/api/users/login", corsReq, jsonParser, function (req, res) {
    if (!req.body) {
        return res.status(400).send();
    }
    var user = req.body;
    var getUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var userLog;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.User.findAll({
                        where: {
                            name: user.name,
                            password: user.password,
                            status: true
                        }
                    })];
                case 1:
                    userLog = _a.sent();
                    userLog.forEach(function (el) { return (el.dateLogin = new Date()); });
                    userLog.forEach(function (el) { return el.save(); });
                    userLog.length !== 0 ? res.send(userLog) : res.status(404).send();
                    return [2 /*return*/];
            }
        });
    }); };
    getUser();
});
//Add user
app.post("/api/users", corsReq, jsonParser, function (req, res) {
    if (!req.body) {
        return res.status(400).send();
    }
    var user = req.body;
    var setUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var allUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user.dateReg = new Date();
                    return [4 /*yield*/, db_1.User.findAll()];
                case 1:
                    allUsers = _a.sent();
                    if (!allUsers.find(function (el) { return el.name === user.name; })) return [3 /*break*/, 2];
                    return [2 /*return*/, res.status(409).send("Пользователь уже существует")];
                case 2: return [4 /*yield*/, db_1.User.create(user)];
                case 3:
                    _a.sent();
                    console.log("Пользователь успешно создан!");
                    res.send(allUsers);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    setUser();
});
//Remove user
app.post("/api/users/delete", corsReq, jsonParser, function (req, res) {
    if (!req.body) {
        return res.status(400).send();
    }
    var users = req.body; //body - array
    var setUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var allUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.User.destroy({
                        where: {
                            id: users.map(function (el) { return el.id; })
                        }
                    })];
                case 1:
                    _a.sent();
                    console.log("Users removed!");
                    return [4 /*yield*/, db_1.User.findAll()];
                case 2:
                    allUsers = _a.sent();
                    res.send(allUsers);
                    return [2 /*return*/];
            }
        });
    }); };
    setUser();
    // res.send('Users removed!');
});
//Ban user
app.put("/api/users/ban", corsReq, jsonParser, function (req, res) {
    if (!req.body) {
        return res.status(400).send();
    }
    var users = req.body;
    try {
        var banUser = function () { return __awaiter(void 0, void 0, void 0, function () {
            var allUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.User.update({ status: false }, {
                            where: {
                                id: users.map(function (el) { return el.id; })
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db_1.User.findAll()];
                    case 2:
                        allUsers = _a.sent();
                        res.send(allUsers);
                        return [2 /*return*/];
                }
            });
        }); };
        banUser();
    }
    catch (err) {
        res.status(400).send(err);
    }
});
//Unblock user
app.put("/api/users/unblock", corsReq, jsonParser, function (req, res) {
    if (!req.body) {
        return res.status(400).send();
    }
    var users = req.body;
    var banUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var allUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.User.update({ status: true }, {
                        where: {
                            id: users.map(function (el) { return el.id; })
                        }
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db_1.User.findAll()];
                case 2:
                    allUsers = _a.sent();
                    res.send(allUsers);
                    return [2 /*return*/];
            }
        });
    }); };
    banUser();
});
var port = process.env.PORT || 5000;
app.use(express.static(path.resolve(__dirname, "./build")));
app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "./build/index.html"));
});
app.listen(port, function () {
    console.log("Server is running on: http://localhost:".concat(port));
});
