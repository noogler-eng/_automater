import prisma from "./db/prisma";
import kafka from "./config/kafka";

const main = async () => {
  const producer = kafka.producer();
  await producer.connect();

  while (1) {
    // we are taking the top 5 zapRunOutOfBox zaps
    const pendingRows = await prisma.zapRunOutOfBox.findMany({
      where: {},
      take: 10,
    });

    // we send them to kafka
    await producer.send({
      topic: "zap-events",
      messages: pendingRows.map((item) => ({
        value: item.zapRunId.toString(),
      })),
    });

    // we will delete them from zapRunOutOfBox
    await prisma.zapRunOutOfBox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((item) => item.id),
        },
      },
    });
  }
};

main().then(()=>{
    // this will never be happen
    console.log("main server work is complete");
}).catch((err)=>{
    console.log("error in proccessor server: ", err);
})