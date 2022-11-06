import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './v1/swagger_api_v1.json';
import protectRoute from '../middlewares/protectRoute';

import { router as checkInRouter } from './v1/checkInRouter';
import { router as healthRouter } from './v1/healthRouter';

const router = Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDoc));

router.use('/site', protectRoute(), checkInRouter);
router.use('/health', healthRouter);

export default router;
