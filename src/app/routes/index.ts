import express from 'express';
import { TestRoutes } from '../modules/test/test.route';

const router = express.Router();

const allRouts = [
  {
    path: '/test',
    route: TestRoutes,
  },
];

allRouts.forEach((route) => router.use(route.path, route.route));

export default router;
