import { Bean } from 'express-beans';
import { Channel, Connection, connect } from 'amqplib';

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
    const { queue } = await this.channel.assertQueue('tasks');
    console.log('queue:', queue);
    this.channel.consume(queue, (msg) => {
      console.log('consume', msg?.content.toString());
    }, { noAck: true });
  }

  async enqueueTask(user: string, url: string) {
    this.channel.sendToQueue('tasks', Buffer.from(JSON.stringify({ user, url })));
  }
}
