import { Request, Response } from 'express';
import { InjectBean, Route, RouterBean } from 'express-beans';
import TaskService from '@/services/TaskService';

@RouterBean('/short')
export default class ExampleRouter {
  @InjectBean(TaskService)
  private taskService!: TaskService;

  @Route('POST', '/')
  async post(req: Request, res: Response) {
    const user = req.header('x-user');
    if (!user) {
      res.status(400).send({ reason: 'User identification must be provided' });
      return;
    }
    const { url } = req.body;
    if (!url) {
      res.status(400).send({ reason: 'An URL must be provided' });
    }
    await this.taskService.enqueue(user, url);
    res.status(200).end('OK');
  }

  async get(_req: Request, res: Response) {
    res.end('get');
  }
}
