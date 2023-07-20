import { ExpressBeans } from 'express-beans';
import { json } from 'express';
import HealthCheckRouter from '@/routes/HealthCheckRouter';
import ShortRouter from '@/routes/ShortRouter';
import StatsRouter from '@/routes/StatsRouter';

const app = new ExpressBeans({
  routerBeans: [
    ShortRouter,
    StatsRouter,
    HealthCheckRouter,
  ],
});

app.use(json());
