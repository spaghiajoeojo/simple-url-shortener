import { Bean, InjectBean } from 'express-beans';
import { ConsumeMessage } from 'amqplib';
import { randomUUID } from 'crypto';
import RabbitClient from '@/clients/RabbitClient';
import { TaskResult } from '@/types';

@Bean
export default class TaskService {
  private TIMEOUT = 30000;

  @InjectBean(RabbitClient)
  private rabbitClient!: RabbitClient;

  async enqueue(task: any): Promise<TaskResult> {
    const queue = await this.rabbitClient.getResponseQueue();
    const correlationId = randomUUID();
    const replyTo = queue;
    const promise: Promise<TaskResult> = new Promise((resolve, reject) => {
      this.rabbitClient.consume(
        queue,
        (msg: ConsumeMessage | null) => {
          if (msg?.properties.correlationId === correlationId) {
            this.rabbitClient.ack(msg);
            console.log('@@@@@@@@@@@@@@@');
            resolve(JSON.parse(msg.content.toString()));
          }
        },
      );
      setTimeout(() => reject(new Error('Timeout occurred')), this.TIMEOUT);
    });
    this.rabbitClient.sendToQueue(
      'tasks',
      task,
      correlationId,
      replyTo,
    );
    return promise;
  }
}
