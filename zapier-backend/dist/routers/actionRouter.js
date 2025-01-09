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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const db_1 = __importDefault(require("../utils/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const actionRouter = express_1.default.Router();
// we can get this without also
actionRouter.get("/availableActions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const availableActions = yield db_1.default.availableActions.findMany({});
        return res.status(200).json({
            availableActions: availableActions,
        });
    }
    catch (error) {
        return res.status(501).json({
            msg: "there is some error in server side",
        });
    }
}));
actionRouter.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.default = actionRouter;
