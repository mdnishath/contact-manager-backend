import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ContactRoutes } from '../modules/Contact/contact.route';

const router = express.Router();

const allRouts = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/contacts',
    route: ContactRoutes,
  },
];

allRouts.forEach((route) => router.use(route.path, route.route));

export default router;
