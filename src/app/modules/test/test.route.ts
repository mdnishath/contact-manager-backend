import express from 'express';
import { TestControllers } from './test.controller';
// import { validateRequest } from '../../../middlewares/validateRequest';
// import { createTestValidationSchema } from './test.validation';
const router = express.Router();

router.post('/', TestControllers.createTestCollection);
router.get('/', TestControllers.getCollections);

export const TestRoutes = router;
