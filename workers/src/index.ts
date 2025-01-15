import prisma from "./db/prisma";
import kafka from "./config/kafka";

const main = async () => {
  const consumer = kafka.consumer({ groupId: "main-worker" });
  await consumer.connect();
  await consumer.subscribe({ topic: "zap-events", fromBeginning: true });

  while (1) {
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });

        // this timeout for sending the email / desepnse the solana
        await new Promise((resolve, reject) => setTimeout(resolve, 1000));
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
