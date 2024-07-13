import { Request, Response } from "express"
import { repairsService } from "../services/repairs.service"
import { CreateRepairsDto } from "../../domain/dtos/repairs/repairs-create-dto"
import { CustomError } from "../../domain/errors/custom-errors"
import { UpdateRepairDto } from "../../domain/dtos/repairs/repairs-update-dto"

export class RepairsController {

   constructor(
      private readonly repairsServices: repairsService
   ) { }
   private handleError = (err: unknown, res: Response) => {
      if (err instanceof CustomError) {
         return res.status(err.status).json({ message: err.message })
      }
      return res.status(500).json({ message: 'Something went very wrong! 🧨' })
   }

   createRepair = (req: Request, res: Response) => {
      const [error, createRepair] = CreateRepairsDto.createRepairs(req.body);
    
      if (error) {
        return res.status(400).json({ message: error });
      }
    
      if (!createRepair) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    
      this.repairsServices.createRepair(createRepair)
        .then((repair) => {
          res.status(201).json(repair);
        })
        .catch((error) => {
          console.error('Error creating repair:', error);
          res.status(500).json({ message: 'Failed to create repair' });
        });
    }
    

   findAllRepairs = (req: Request, res: Response) => {
      this.repairsServices.findAllRepairs()
         .then(repairs => res.status(200).json(repairs))
         .catch((err: unknown) => this.handleError(err, res))
   }

   findOneRepair = (req: Request, res: Response) => {
      const { id } = req.params;
      if (isNaN(+id)) {
         return res.status(400).json({ message: "El id debe ser un numero" })
      }

      this.repairsServices.findOneRepair(+id)
         .then(repairs => res.status(200).json(repairs))
         .catch((err: unknown) => this.handleError(err, res))
   }

   updateRepair = (req: Request, res: Response) => {
      const { id } = req.params
      const [error, updateRepair] = UpdateRepairDto.update(req.body)
      if (isNaN(+id)) {
         return res.status(400).json({ message: error })
      }
      if (error) return res.status(422).json({ message: error })
      this.repairsServices.updateRepair(updateRepair!, +id)
         .then(repairs => res.status(200).json(repairs))
         .catch((error: unknown) => res.status(500).json(error))
   }

   deleteRepair = (req: Request, res: Response) => {
      const userId = req.body.sessionUser.id;
      const { id } = req.params
      if (isNaN(+id)) {
         return res.status(404).json({ message: ' El id debe ser un numero' })
      }
      this.repairsServices.deleteRepair(+id, userId)
         .then(deleteRepairs => res.status(204).json(deleteRepairs))
         .catch((error: unknown) => res.status(500).json(error))
   }
}