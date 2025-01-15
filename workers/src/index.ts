import prisma from "./db/prisma";
import kafka from "./config/kafka";

const main = async () => {
  const consumer = kafka.consumer({ groupId: "main-worker" });
  await consumer.connect();
  await consumer.subscribe({ topic: "zap-events", fromBeginning: true });

  while (1) {
    await consumer.run({
      // this is for ACK which was by default true
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });

        // this timeout for sending the email / desepnse the solana
        await new Promise((resolve, reject) => setTimeout(resolve, 5 * 1000));

        // giving ACK to the kafka that yes this zap is done by the worker
        await consumer.commitOffsets([
          { topic: topic, partition: partition, offset: message.offset },
        ]);
      },
    });
  }
};

main()
  .then(() => {
    console.log("worker has been stopped!");
  })
  .catch((error) => {
    console.log("there is some error in worker server: ", error);
  });
