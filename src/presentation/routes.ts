import { Router } from "express";
import { RepairsRoutes } from "./repairs/router";
import { UsersRoutes } from "./users/routes";

export class AppRoutes {

static get routes(): Router {
    
    const router = Router();

    router.use('/api/v1/users', UsersRoutes.routes)
    router.use('/api/v1/repairs', RepairsRoutes.routes)

    return router
}

}