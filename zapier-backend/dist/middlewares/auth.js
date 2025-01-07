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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../utils/db"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fullToken = (yield req.headers.authorization) || "";
    const token = (fullToken === null || fullToken === void 0 ? void 0 : fullToken.split(" ")[1]) || "";
    try {
        if (!process.env.SECRET_KEY)
            throw new Error("secret key not found");
        const isVerify = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const user = yield db_1.default.user.findUnique({
            where: {
                // @ts-ignore
                email: isVerify === null || isVerify === void 0 ? void 0 : isVerify.email,
            },
        });
        console.log(user);
        if (user)
            next();
        else {
            res.status(403).json({
                msg: "Session has been ended || you are not logged in",
            });
        }
    }
    catch (error) {
        res.json({
            msg: error,
        });
    }
});
exports.default = authMiddleware;
