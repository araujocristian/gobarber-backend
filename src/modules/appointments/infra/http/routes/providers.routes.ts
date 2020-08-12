import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

// DTO - Data Transfer Object
// DRY - Don't Repeat Yoursefl

// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta.

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
