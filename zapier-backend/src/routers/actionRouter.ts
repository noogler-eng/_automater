import express from "express";
import authMiddleware from "../middlewares/auth";
import prisma from "../utils/db";
// import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const actionRouter = express.Router();

// we can get this without also
actionRouter.get("/availableActions", async (req, res) => {
  try {
    const availableActions = await prisma.availableActions.findMany({});
    return res.status(200).json({
      availableActions: availableActions,
    });
  } catch (error) {
    return res.status(501).json({
      msg: "there is some error in server side",
    });
  }
});

actionRouter.get("/", authMiddleware, async (req, res) => {});

export default actionRouter;
