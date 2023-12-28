import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';

const router = express.Router();

const allRouts = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

allRouts.forEach((route) => router.use(route.path, route.route));

export default router;
