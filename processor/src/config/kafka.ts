import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "outbox-processors",
  brokers: ["localhost:9092"],
});

export default kafka;