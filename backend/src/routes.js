import { Router } from "express";
import UserCPF from "./controllers/cpf";
import UserController  from "./controllers/userController";


const routes = new Router();

routes.post('/CPF',UserCPF.verify);
routes.post('/save',UserController.store);


export default routes;