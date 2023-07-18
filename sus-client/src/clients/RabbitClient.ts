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
  }

  async enqueueTask(user: string, url: string) {
    const { queue } = await this.channel.assertQueue('tasks');
    console.log(queue);
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify({ user, url })));
  }
}
