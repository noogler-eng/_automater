import express from "express";
import authMiddleware from "../middlewares/auth";
import { Request, Response } from "express";
import prisma from "../utils/db";
import passwordHash from "password-hash";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import validInputSignup from "../interfaces/signup";
import validInputSignin from "../interfaces/signin";

const userRouter = express.Router();

// @dev - this is middleware
// userRouter.use((req, res, next)=>{})
userRouter.post("/signup", async (req: Request, res: Response) => {
  const body = await req.body;
  try {
    const isSafeParseObject = validInputSignup.safeParse(body);
    if (!isSafeParseObject.success) {
      return res.status(411).json({
        msg: "Invalid Input",
      });
    } else {
      const pre_user = await prisma.user.findUnique({
        where: {
          email: isSafeParseObject.data.email,
        },
      });

      if (pre_user) {
        return res.status(411).json({
          msg: "user with this email already exists",
        });
      } else {
        const password = passwordHash.generate(isSafeParseObject.data.password);
        const user = await prisma.user.create({
          data: {
            firstName: isSafeParseObject.data.firstName,
            lastName: isSafeParseObject.data.lastName,
            email: isSafeParseObject.data.email,
            password: password,
          },
        });

        const token = await jwt.sign(
          { email: user.email },
          process.env.SECRET_KEY || "",
          { expiresIn: "1h" }
        );

        return res.status(201).json({
          msg: "user created susscessfully",
          token: token,
        });
      }
    }
  } catch (error) {
    console.log("signup-error: ", error);
    return res.status(500).json({
      msg: "server internal error",
    });
  }
});

userRouter.post("/signin", async (req: Request, res: Response) => {
  const body = await req.body;

  try {
    const isValidObject = validInputSignin.safeParse(body);
    if (!isValidObject.success) {
      return res.status(411).json({
        msg: "Invalid Input",
      });
    } else {
      const user = await prisma.user.findUnique({
        where: {
          email: isValidObject.data.email,
        },
      });

      console.log(user);

      if (!user) {
        return res.status(411).json({
          msg: "Invalid email",
        });
      }

      const isPasswordSame = passwordHash.verify(
        isValidObject.data.password,
        user.password
      );
      if (!isPasswordSame) {
        return res.status(411).json({
          msg: "Invalid password",
        });
      }

      const token = await jwt.sign(
        { email: user.email },
        process.env.SECRET_KEY || "",
        { expiresIn: "1h" }
      );

      console.log("token", token);

      return res.status(201).json({
        msg: "user logged in susscessfully",
        token: token,
      });
    }
  } catch (error) {
    console.log("sigin-error: ", error);
    res.status(500).json({
      msg: "server internal error",
    });
  }
});

// @dev - getting user after checking is the user is signed in ot not
userRouter.get("/", authMiddleware, async (req, res) => {
  const fullToken: string = (await req.headers.authorization) || "";
  const token = fullToken?.split(" ")[1] || "";

  try {
    // @ts-ignore
    const payload: JwtPayload = jwt.decode(token);
    const email = payload?.email || "";
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
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
  } catch (error) {
    console.log("current user-error: ", error);
    res.status(500).json({
      msg: "server internal error",
    });
  }
});

export default userRouter;
