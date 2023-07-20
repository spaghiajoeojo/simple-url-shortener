import { Bean } from 'express-beans';
import {
  Channel, Connection, connect,
} from 'amqplib';
import Task from '@/models/Task';

@Bean
export default class RabbitClient {
  private connection!: Connection;

  private channel!: Channel;

  private initialization: Promise<void>;

  constructor() {
    this.initialization = this.init();
  }

  private async init() {
    this.connection = await connect('amqp://rabbitmq');
    this.channel = await this.connection.createChannel();
  }

  async consume(queueName: string, consumer: (msg: Task) => Promise<string | null>) {
    if (!this.channel) {
      await this.initialization;
    }
    const { queue } = await this.channel.assertQueue(queueName, { durable: true });
    this.channel.consume(queue, async (msg) => {
      try {
        const json = this.parseMessageContent(msg?.content);
        const result = await consumer(json);
        let error;
        if (!result) {
          error = 'Task failed';
        }
        this.channel.sendToQueue(
          msg?.properties.replyTo,
          Buffer.from(JSON.stringify({ result, error })),
          { correlationId: msg?.properties.correlationId },
        );
      } catch (err) {
        // should be managed as a failed task
        console.error(err);
      }
    }, { noAck: true });
  }

  private parseMessageContent(buff?: Buffer): Task {
    if (!buff) {
      throw new Error('Cannot parse message because buffer is not present');
    }
    return new Task(JSON.parse(buff.toString()));
  }
}
