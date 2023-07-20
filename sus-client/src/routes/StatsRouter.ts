import { Request, Response } from 'express';
import { InjectBean, Route, RouterBean } from 'express-beans';
import TaskService from '@/services/TaskService';

@RouterBean('/stats')
export default class StatsRouter {
  @InjectBean(TaskService)
  private taskService!: TaskService;

  @Route('GET', '/')
  async getUserSubmissions(req: Request, res: Response) {
    const user = req.header('x-user');
    if (!user) {
      res.status(400).send({ reason: 'User identification must be provided' });
      return;
    }
    const { result, error } = await this.taskService.send({ user, type: 'stats' });
    if (error) {
      res.status(500).send({ reason: error });
      return;
    }
    res.status(200).end(result);
  }

  @Route('GET', '/:shortId')
  async getVisits(req: Request, res: Response) {
    const user = req.header('x-user');
    if (!user) {
      res.status(400).send({ reason: 'User identification must be provided' });
      return;
    }
    const { result, error } = await this.taskService.send({ user, shortId: req.params.shortId, type: 'stats' });
    if (error) {
      res.status(500).send({ reason: error });
      return;
    }
    res.status(200).end(result);
  }
}
