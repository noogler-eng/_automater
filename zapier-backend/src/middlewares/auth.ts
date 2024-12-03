import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../utils/db";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const fullToken: string = (await req.headers.authorization) || "";
  const token = fullToken?.split(" ")[1] || "";

  try {
    if (!process.env.SECRET_KEY) throw new Error("secret key not found");

    const isVerify: JwtPayload | String = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    const user = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        email: isVerify?.email,
      },
    });

    if (user) next();
    else {
      res.status(403).json({
        msg: "Session has been ended || you are not logged in",
      });
    }
  } catch (error) {
    res.json({
      msg: error,
    });
  }
};

export default authMiddleware;
