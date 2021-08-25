"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MEE6_1 = __importDefault(require("./MEE6"));
MEE6_1.default.fetchLeaderboard('754187413793800203').then(users => {
    console.log(users.map(u => u.id));
});
