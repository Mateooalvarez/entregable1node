import { Request, Response } from "express"
import { repairsService } from "../services/repairs.service"
import { createRepairsDto } from "../../domain/dtos/repairs/repairs-create-dto"

export class RepairsController {

constructor(
   private readonly repairsServices: repairsService
){

}

createRepair = (req: Request, res: Response) => {
  const [error, createRepair] = createRepairsDto.createRepairs(req.body);
  if (error) return res.status(400).json({message: error})
   this.repairsServices.createRepair(createRepair)
  .then((repair) => {
      res.status(201).json(repair)
   })
   .catch((error) => {
      res.status(500).json(error)
   })
   
}

findAllRepairs = (req: Request, res: Response) => {
   res.status(200).json({ message: 'ok' })
}

findOneRepair = (req: Request, res: Response) => {

}

updateRepair  = (req: Request, res: Response) => {

}

deleteRepair = (req: Request, res: Response) => {

}

}