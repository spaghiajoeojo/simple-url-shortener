import { ExpressBeans } from 'express-beans';
import { json } from 'express';
import HealthCheckRouter from '@/routes/HealthCheckRouter';
import ShortRouter from '@/routes/ShortRouter';

const app = new ExpressBeans({
  routerBeans: [
    ShortRouter,
    HealthCheckRouter,
  ],
});

app.use(json());
