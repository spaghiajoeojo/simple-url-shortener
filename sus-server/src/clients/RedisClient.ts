import { Bean } from 'express-beans';
import { RedisClientType, createClient } from 'redis';

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

  put(_user: string, _url: string) {
    // saving user.url
  }
}
