import { Request, Response } from "express"
import { UserService } from "../services/user.service"

export class UsersController {

constructor(
  private readonly userService: UserService
){

}

createUser = (req: Request, res: Response) => {
   const { name, email, password } = req.body;

   this.userService.createUser({ name, email, password })
   .then((user) => {
      res.status(201).json(user)
   })
   .catch((error) => {
      res.status(500).json(error)
   })
}

findAllUsers = (req: Request, res: Response) => {
   res.status(200).json({ message: 'ok' })
}

findOneUser = (req: Request, res: Response) => {

}

updateUser  = (req: Request, res: Response) => {

}

deleteUser = (req: Request, res: Response) => {

}

}