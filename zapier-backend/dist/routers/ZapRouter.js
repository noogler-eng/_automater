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
const zap_1 = __importDefault(require("../interfaces/zap"));
const db_1 = __importDefault(require("../utils/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zapRouter = express_1.default.Router();
// @dev - this is middleware
// zapRouter.use((req, res, next)=>{})
// @dev - creating zap with avaible triggers and available actions
// there will creation of zap -> trigger -> actions[]
zapRouter.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    const parsedZapObject = zap_1.default.safeParse(body);
    if (!parsedZapObject.success) {
        return res.status(411).json({
            msg: "Invalid inputs",
        });
    }
    try {
        // @dev creating the zap with the trigerrs and actions
        const zap = yield db_1.default.zap.create({
            data: {
                userId: Number(parsedZapObject.data.userId),
                triggerId: parsedZapObject.data.availabelTriggerId,
                trigger: {
                    create: {
                        triggerId: parsedZapObject.data.availabelTriggerId,
                    },
                },
                actions: {
                    // as the actions should be linewise to perform on something
                    create: parsedZapObject.data.actions.map((x, index) => {
                        return {
                            ActionId: x.availableActionsId,
                            sortingOrder: index,
                        };
                    }),
                },
            },
        });
        res.json({
            id: zap.id,
            msg: "zap created sussessfully",
        });
    }
    catch (error) {
        console.log("zap creation error: ", error);
        return res.status(411).json({
            msg: error,
        });
    }
}));
// @dev - getting all the user's zaps
// we can say getting all the workflows of the users
zapRouter.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = ((_a = (yield req.headers.authorization)) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
    const decodedToken = jsonwebtoken_1.default.decode(token);
    // @ts-ignore
    const email = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.email;
    try {
        const zaps = yield db_1.default.user.findUnique({
            where: {
                email: email,
            },
            select: {
                zaps: {
                    include: {
                        trigger: {
                            include: {
                                type: true,
                            },
                        },
                        actions: {
                            include: {
                                type: true,
                            },
                        },
                    },
                },
            },
        });
        return res.json({
            msg: "zaps fetched susscessfully",
            zaps: zaps,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "server internal error",
        });
    }
}));
// @dev - getting specicifc zap with its id
zapRouter.get("/:zapId", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const zapId = yield req.params["zapId"];
    const token = ((_a = (yield req.headers.authorization)) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
    const decodedToken = jsonwebtoken_1.default.decode(token);
    // @ts-ignore
    const email = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.email;
    try {
        const user = yield db_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        // getting only ours zap with our id and our zapId
        const requiredZap = yield db_1.default.zap.findUnique({
            where: {
                id: zapId,
                userId: user === null || user === void 0 ? void 0 : user.id,
            },
            include: {
                trigger: {
                    include: {
                        type: true,
                    },
                },
                actions: {
                    include: {
                        type: true,
                    },
                },
            },
        });
        return res.json({
            msg: "zap extracted sussessfully",
            zap: requiredZap,
        });
    }
    catch (error) {
        console.log("fetching an required zap with id error: ", error);
        res.status(500).json({
            msg: "internal server error",
        });
    }
}));
exports.default = zapRouter;
