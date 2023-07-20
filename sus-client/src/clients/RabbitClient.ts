import { Bean } from 'express-beans';
import {
  Channel, Connection, ConsumeMessage, connect,
} from 'amqplib';

@Bean
export default class RabbitClient {
  private connection!: Connection;

  private channel!: Channel;

  constructor() {
    this.init();
  }

  private async init() {
    this.connection = await connect('amqp://rabbitmq');
    this.channel = await this.connection.createChannel();
  }

  async getResponseQueue(): Promise<string> {
    const { queue } = await this.channel.assertQueue('', { exclusive: true });
    return queue;
  }

  consume(queue: string, consumer: (msg: ConsumeMessage | null) => void) {
    this.channel.consume(queue, consumer);
  }

  ack(msg: ConsumeMessage) {
    this.channel.ack(msg);
  }

  sendToQueue(
    queue: string,
    content: any,
    correlationId: string,
    replyTo: string,
  ) {
    this.channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(content)),
      { correlationId, replyTo },
    );
  }
}
