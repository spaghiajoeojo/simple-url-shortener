import { Request, Response } from 'express';
import { InjectBean, Route, RouterBean } from 'express-beans';
import TaskService from '@/services/TaskService';

@RouterBean('/u')
export default class UrlTranslateRouter {
  @InjectBean(TaskService)
  private taskService!: TaskService;

  @Route('GET', '/:shortId')
  async getVisits(req: Request, res: Response) {
    const user = req.header('x-user');
    if (!user) {
      res.status(400).send({ reason: 'User identification must be provided' });
      return;
    }
    const { result, error } = await this.taskService.send({ user, shortId: req.params.shortId, type: 'translate' });
    if (error) {
      res.status(500).send({ reason: error });
      return;
    }
    res.redirect(result);
  }
}
