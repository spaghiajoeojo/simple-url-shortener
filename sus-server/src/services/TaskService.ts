import { Bean, InjectBean } from 'express-beans';
import { randomInt } from 'crypto';
import RedisClient from '@/clients/RedisClient';
import Task from '@/models/Task';
import ShortenedURL from '@/models/ShortenedURL';

@Bean
export default class TaskService {
  @InjectBean(RedisClient)
  private redisClient!: RedisClient;

  async executeShorteningTask(task: Task): Promise<string> {
    const id = this.generateRandomId(6);
    if (!task.url) {
      throw new Error('Cannot execute task: URL not provided');
    }
    await this.redisClient.put(task.user, new ShortenedURL(id, task.url, 0));
    return id;
  }

  async executeStatsTask(task: Task): Promise<string | null> {
    try {
      if (task.shortId) {
        return (await this.redisClient.getVisits(task.user, task.shortId)).toString();
      }
      return (await this.redisClient.getUserSubmissions(task.user)).toString();
    } catch (err) {
      return null;
    }
  }

  private generateRandomId(length: number): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const chars = Array(length).fill('*');
    return chars.map(() => alphabet.charAt(randomInt(0, alphabet.length))).join('');
  }
}
