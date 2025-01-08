import express from "express";
import authMiddleware from "../middlewares/auth";
import prisma from "../utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const triggerRouter = express.Router();

// we can get this without auth also
triggerRouter.get("/availableTriggers", async (req, res) => {
  try {
    const availableTriggers = await prisma.availableTrigger.findMany({});
    return res.status(200).json({
      availableTriggers: availableTriggers,
    });
  } catch (error) {
    return res.status(501).json({
      msg: "there is some error in server side",
    });
  }
});

triggerRouter.get("/", authMiddleware, async (req, res) => {});

export default triggerRouter;
