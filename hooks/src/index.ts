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
  const body = req.body;

  try{
    await prisma.$transaction(async tx => {
        await tx.zapRun.create({
            data: {
                zapId: params.zapId,
                metadata: body
            }
        }),

        // outbox pattern microservices
        // there are another entry which is zapRunOutOfBox and zapRun(hook)
        // the entry in zapRunOutOfBox goes to kafka
        // why dont we directly not put in kafka ?
        // it is not valid as kafka in transaction of prisma so that's why
        // we need atomicity here.
        await tx.zapRunOutOfBox.create({
            data: {
                zapRunId: params.zapId,
            }
        })
    });

    res.status(200).json({
        msg: "hook hit"
    })
  }catch(error){
    res.status(500).json({
        msg: "server side error",
        error : error
    })
  }
})
  

// listening the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`hooks server running on: http://localhost:${PORT}`);
});
