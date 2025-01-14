import express from "express";
import prisma from "./db/prisma";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// store in dp a new trigger
// push it onto a kafka (pub sub model)
// we are using transaction here to surely the zap gets reached to both or not reach to anyone
// transactional outbox pattern
// there is a concept of ACK queue, which will remove the item from queue when it rec ACK
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const params = req.params;
  //   const zap = prisma.zap.findUnique({
  //     where: {
  //       userId: Number(params.userId),
  //       id: params.zapId,
  //     },
  //   });

  //   if (!zap) {
  //     res.status(411).json({
  //       msg: "zap not found || invalid zap id",
  //     });
  //   }

  


  
});

// listening the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`hooks server running on: http://localhost:${PORT}`);
});
