import { Request, Response } from 'express';
import { InjectBean, Route, RouterBean } from 'express-beans';
import TaskService from '@/services/TaskService';

@RouterBean('/short')
export default class ShortRouter {
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
    const { result, error } = await this.taskService.send({ user, url });
    if (error) {
      res.status(500).send({ reason: error });
    }
    res.status(200).end(`${new URL(req.url, `http://${req.headers.host}`)}u/${result}`);
  }

  async get(_req: Request, res: Response) {
    res.end('get');
  }
}
