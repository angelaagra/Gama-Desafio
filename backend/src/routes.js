import {Router} from 'express';
import UserCPF from "./controllers/cpf.js";
import UserController  from "./controllers/userController.js";


const routes = new Router();

routes.post('/CPF',UserCPF.verify);
routes.post('/save',UserController.store);


export default routes;