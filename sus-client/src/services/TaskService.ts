import { Bean, InjectBean } from 'express-beans';
import RabbitClient from '@/clients/RabbitClient';

@Bean
export default class TaskService {
  @InjectBean(RabbitClient)
  private rabbitClient!: RabbitClient;

  enqueue(user: string, url: string) {
    this.rabbitClient.enqueueTask(user, url);
    console.log(user, url);
  }
}
