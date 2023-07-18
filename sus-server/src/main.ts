import { ExpressBeans } from 'express-beans';
import HealthCheckRouter from '@/routes/HealthCheckRouter';
import ExampleRouter from '@/routes/ExampleRouter';

ExpressBeans.createApp({
  routerBeans: [
    ExampleRouter,
    HealthCheckRouter,
  ],
});
