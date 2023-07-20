import { createHash } from 'crypto';
import { Bean } from 'express-beans';
import { RedisClientType, createClient } from 'redis';
import ShortenedURL from '@/models/ShortenedURL';

@Bean
export default class RedisClient {
  private client: RedisClientType;

  constructor() {
    this.client = createClient(
      {
        url: 'redis://redis',
      },
    );
    this.client.on('error', (err) => {
      console.log(err);
    });
    this.connect();
  }

  private async connect() {
    await this.client.connect();
  }

  private hash(str: string) {
    return createHash('sha1').update(str).digest('hex');
  }

  async put(user: string, shortenedURL: ShortenedURL) {
    const userHash = this.hash(user);
    this.client.json.SET(`${userHash}:${shortenedURL.id}`, '$', shortenedURL.toJSON());
  }

  async getURL(user: string, id: string): Promise<string> {
    return this.client.json.GET(`${this.hash(user)}:${id}`, { path: '.url' }) as Promise<string>;
  }

  async getVisits(user: string, id: string): Promise<number> {
    return this.client.json.GET(`${this.hash(user)}:${id}`, { path: '.visits' }) as Promise<number>;
  }

  async addVisit(user: string, id: string): Promise<number> {
    return this.client.json.NUMINCRBY(`${this.hash(user)}:${id}`, '.visits', 1) as Promise<number>;
  }

  async getUserSubmissions(user: string): Promise<number> {
    return (await this.client.KEYS(`${this.hash(user)}:*`)).length;
  }
}
