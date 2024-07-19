import { Router } from "express";
import { UsersController } from "./controller";
import { UserService } from "../services/user.service";
import { authenticateToken } from "../middleware/auth-middleware";


export class UsersRoutes {

static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const controller = new UsersController(userService);

    router.post('/', controller.createUser)

    router.post('/login', controller.loginUser)

    router.get('/', authenticateToken, controller.findAllUsers)
    router.get('/:id', authenticateToken, controller.findAllUsers)
    router.patch('/:id', authenticateToken, controller.updateUser)
    router.delete('/:id', authenticateToken, controller.deleteUser)

    return router
}

}