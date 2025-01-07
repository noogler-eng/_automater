import express from "express";
import authMiddleware from "../middlewares/auth";
import { Request, Response } from "express";
import zapObject from "../interfaces/zap";
import prisma from "../utils/db";
import jwt from "jsonwebtoken";

const zapRouter = express.Router();

// @dev - this is middleware
// zapRouter.use((req, res, next)=>{})

// @dev - creating zap with avaible triggers and available actions
// there will creation of zap -> trigger -> actions[]
zapRouter.post("/", authMiddleware, async (req: Request, res: Response) => {
  const body = await req.body;
  const parsedZapObject = zapObject.safeParse(body);

  if (!parsedZapObject.success) {
    return res.status(411).json({
      msg: "Invalid inputs",
    });
  }

  try {
    // @dev creating the zap with the trigerrs and actions
    const zap = await prisma.zap.create({
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
  } catch (error) {
    console.log("zap creation error: ", error);
    return res.status(411).json({
      msg: error,
    });
  }
});

// @dev - getting all the user's zaps
// we can say getting all the workflows of the users
zapRouter.get("/", authMiddleware, async (req: Request, res: Response) => {
  const token = (await req.headers.authorization)?.split(" ")[1] || "";
  const decodedToken = jwt.decode(token);
  // @ts-ignore
  const email = decodedToken?.email;

  try {
    const zaps = await prisma.user.findUnique({
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
  } catch (error) {
    res.status(500).json({
      msg: "server internal error",
    });
  }
});

// @dev - getting specicifc zap with its id
zapRouter.get(
  "/:zapId",
  authMiddleware,
  async (req: Request, res: Response) => {
    const zapId = await req.params["zapId"];
    const token = (await req.headers.authorization)?.split(" ")[1] || "";
    const decodedToken = jwt.decode(token);
    // @ts-ignore
    const email = decodedToken?.email;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      // getting only ours zap with our id and our zapId
      const requiredZap = await prisma.zap.findUnique({
        where: {
          id: zapId,
          userId: user?.id,
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
    } catch (error) {
      console.log("fetching an required zap with id error: ", error);
      res.status(500).json({
        msg: "internal server error",
      });
    }
  }
);

export default zapRouter;
