import { Request, Response } from 'express';
import { InjectBean, Route, RouterBean } from 'express-beans';
import ExampleService from '@/services/ExampleService';
import RedisClient from '@/clients/RedisClient';
import RabbitClient from '@/clients/RabbitClient';

@RouterBean('/example')
export default class ExampleRouter {
  @InjectBean(ExampleService)
    exampleService!: ExampleService;

  @InjectBean(RedisClient)
    redisClient!: RedisClient;

  @InjectBean(RabbitClient)
    rabbitClient!: RabbitClient;

  @Route('GET', '/hello')
  hello(_req: Request, res: Response) {
    res.end(this.exampleService.example());
  }
}
