"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRouters_1 = __importDefault(require("./routers/UserRouters"));
const ZapRouter_1 = __importDefault(require("./routers/ZapRouter"));
const triggerRouter_1 = __importDefault(require("./routers/triggerRouter"));
const actionRouter_1 = __importDefault(require("./routers/actionRouter"));
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.get("/", (req, res) => {
    res.send("server is working");
});
// @dev - using the user router with the /api/v1/user as starting
server.use("/api/v1/user", UserRouters_1.default);
server.use("/api/v1/zap", ZapRouter_1.default);
server.use("/api/v1/trigger", triggerRouter_1.default);
server.use("/api/v1/action", actionRouter_1.default);
const PORT = process.env.PORT || 5050;
server.listen(PORT, () => {
    console.log(`server listening at: http://localhost:${PORT}`);
});
