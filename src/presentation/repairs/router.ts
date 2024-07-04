import { Router } from 'express';
import { RepairsController } from "./controller";
import { repairsService } from '../services/repairs.service';
import { authenticateToken, authorizeEmployee } from '../middleware/auth-middleware';

export class RepairsRoutes {

static get routes(): Router {
    const router = Router();

    const repairService = new repairsService();
    const controller = new RepairsController(repairService);

    router.get('/',authenticateToken, authorizeEmployee, (req, res) => {
        res.send('List of motorcycles pending repair')
    })
    router.post('/', controller.createRepair)
    router.get('/:id', authenticateToken, authorizeEmployee, (req, res) => {
        const id = req.params.id
        res.send(`Details of the motorcycle pending repair with id ${id}`)
    })
    router.patch('/:id', authenticateToken, authorizeEmployee, (req, res) => {
        const id = req.params.id 
        res.send(`Repair with id ${id} marked as completed`)
    })
    router.delete('/:id', authenticateToken, authorizeEmployee, (req, res) => {
        const id = req.params.id 
        res.send(`Repair with id ${id} canceled`)
    })

    return router
}

}