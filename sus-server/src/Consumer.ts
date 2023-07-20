import { Bean, InjectBean } from 'express-beans';
import RabbitClient from '@/clients/RabbitClient';
import TaskService from '@/services/TaskService';
import Task from '@/models/Task';

@Bean
export default class Consumer {
  @InjectBean(RabbitClient)
  private rabbitClient!: RabbitClient;

  @InjectBean(TaskService)
  private taskService!: TaskService;

  static getIntance() {
    // retrieving singleton instance
    const { instance } = this as any;
    return instance;
  }

  init() {
    this.rabbitClient.consume('tasks', (task: Task) => {
      switch (task.type) {
      case 'shortening':
        return this.taskService.executeShorteningTask(task);
      case 'stats':
        return this.taskService.executeStatsTask(task);
      default:
        throw new Error('Cannot execute task: task type unknown');
      }
    });
  }
}
