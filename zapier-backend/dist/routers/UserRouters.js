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
const password_hash_1 = __importDefault(require("password-hash"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signup_1 = __importDefault(require("../interfaces/signup"));
const signin_1 = __importDefault(require("../interfaces/signin"));
const userRouter = express_1.default.Router();
// @dev - this is middleware
// userRouter.use((req, res, next)=>{})
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    try {
        const isSafeParseObject = signup_1.default.safeParse(body);
        if (!isSafeParseObject.success) {
            return res.status(411).json({
                msg: "Invalid Input",
            });
        }
        else {
            const pre_user = yield db_1.default.user.findUnique({
                where: {
                    email: isSafeParseObject.data.email,
                },
            });
            if (pre_user) {
                return res.status(411).json({
                    msg: "user with this email already exists",
                });
            }
            else {
                const password = password_hash_1.default.generate(isSafeParseObject.data.password);
                const user = yield db_1.default.user.create({
                    data: {
                        firstName: isSafeParseObject.data.firstName,
                        lastName: isSafeParseObject.data.lastName,
                        email: isSafeParseObject.data.email,
                        password: password,
                    },
                });
                const token = yield jsonwebtoken_1.default.sign({ email: user.email }, process.env.SECRET_KEY || "", { expiresIn: "1h" });
                return res.status(201).json({
                    msg: "user created susscessfully",
                    token: token,
                });
            }
        }
    }
    catch (error) {
        console.log("signup-error: ", error);
        return res.status(500).json({
            msg: "server internal error",
        });
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    console.log('something!');
    try {
        const isValidObject = signin_1.default.safeParse(body);
        if (!isValidObject.success) {
            return res.status(411).json({
                msg: "Invalid Input",
            });
        }
        else {
            const user = yield db_1.default.user.findUnique({
                where: {
                    email: isValidObject.data.email,
                },
            });
            if (!user) {
                return res.status(411).json({
                    msg: "Invalid email",
                });
            }
            const isPasswordSame = password_hash_1.default.verify(isValidObject.data.password, user.password);
            if (!isPasswordSame) {
                return res.status(411).json({
                    msg: "Invalid password",
                });
            }
            const token = yield jsonwebtoken_1.default.sign({ email: user.email }, process.env.SECRET_KEY || "", { expiresIn: "1h" });
            console.log('token', token);
            return res.status(201).json({
                msg: "user logged in susscessfully",
                token: token,
            });
        }
    }
    catch (error) {
        console.log("sigin-error: ", error);
        res.status(500).json({
            msg: "server internal error",
        });
    }
}));
// @dev - getting user after checking is the user is signed in ot not
userRouter.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fullToken = (yield req.headers.authorization) || "";
    const token = (fullToken === null || fullToken === void 0 ? void 0 : fullToken.split(" ")[1]) || "";
    try {
        // @ts-ignore
        const payload = jsonwebtoken_1.default.decode(token);
        const email = (payload === null || payload === void 0 ? void 0 : payload.email) || "";
        const user = yield db_1.default.user.findUnique({
            where: {
                email: email,
            },
            select: {
                firstName: true,
                lastName: true,
                imageUrl: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return res.status(201).json({
            msg: "user get susscessfully",
            user: user,
        });
    }
    catch (error) {
        console.log("current user-error: ", error);
        res.status(500).json({
            msg: "server internal error",
        });
    }
}));
exports.default = userRouter;
