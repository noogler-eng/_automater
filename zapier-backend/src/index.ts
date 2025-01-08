import express from "express";
import cors from "cors";
import userRouter from "./routers/UserRouters";
import zapRouter from "./routers/ZapRouter";
import triggerRouter from "./routers/triggerRouter";
import actionRouter from "./routers/actionRouter";

const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("server is working");
});

// @dev - using the user router with the /api/v1/user as starting
server.use("/api/v1/user", userRouter);
server.use("/api/v1/zap", zapRouter);
server.use("/api/v1/trigger", triggerRouter);
server.use("/api/v1/action", actionRouter);

const PORT = process.env.PORT || 5050;
server.listen(PORT, () => {
  console.log(`server listening at: http://localhost:${PORT}`);
});
