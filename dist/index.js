"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var poll_block_number_1 = require("./poll-block-number");
require('dotenv').config();
console.log(process.env);
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.get('/health', function (req, res) {
    res.send('OK');
});
var port = parseInt(process.env.PORT || '3008');
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
// Poll every minute
setInterval(poll_block_number_1.pollBlockNumber, 10000);
(0, poll_block_number_1.pollBlockNumber)();
//# sourceMappingURL=index.js.map