import { ExpressBeans } from 'express-beans';
import { json } from 'express';
import HealthCheckRouter from '@/routes/HealthCheckRouter';
import ShortRouter from '@/routes/ShortRouter';
import StatsRouter from '@/routes/StatsRouter';
import UrlTranslateRouter from '@/routes/UrlTranslateRouter';

const app = new ExpressBeans({
  routerBeans: [
    UrlTranslateRouter,
    ShortRouter,
    StatsRouter,
    HealthCheckRouter,
  ],
});

app.use(json());
