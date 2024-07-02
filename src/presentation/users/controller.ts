import { Request, Response } from "express"
import { UserService } from "../services/user.service"
import { CustomError } from "../../domain/errors/custom-errors"
import { UpdateUserDto } from "../../domain/dtos/users/update-user-dto"
import { RegisterDto } from "../../domain/dtos/users/register-user-dto"

export class UsersController {

constructor(
  private readonly userService: UserService
){

}

private handleErrror = (error:unknown, res:Response)=>{

   if( error instanceof CustomError ){
       return res.status(error.status).json({message : error.message})
   }
   return res.status(500).json({ message: 'Something went very wrong! 🧨' })
}

createUser = (req: Request, res: Response) => {
  const [error, createUserDto] = RegisterDto.create(req.body)
  if (error) return res.status(400).json({message: error}) 

   this.userService.createUser(createUserDto!)
   .then(user => res.status(200).json(user))
   .catch((error: unknown) => this.handleErrror(error, res) )
}

findAllUsers = (req: Request, res: Response) => {
   this.userService.findAllUsers()
   .then((user) => {
      res.status(201).json(user)
   })
   .catch((error) => {
      res.status(500).json(error)
   })
}

findOneUser = (req: Request, res: Response) => {
   const {id} = req.params
   if(isNaN(+id)){
       return res.status(400).json({message : "El id debe ser un numero"})
   }

   this.userService.findOneUser(+id)
       .then(user => res.status(200).json(user))
       .catch((err : unknown)=> this.handleErrror(err, res))
}


updateUser  = (req: Request, res: Response) => {
   const {id} = req.params
   const [error, updateUseById]= UpdateUserDto.update(req.body)
   if(isNaN(+id)){
       return res.status(400).json({message : "El is debe ser un numero"})
   }

   if(error) return res.status(422).json({messge : error})

   this.userService.updateUser(updateUseById!, +id)
       .then(updateUser => res.status(200).json(updateUser))
       .catch((erro:unknown)=> res.status(500).json(erro))
}

deleteUser = (req: Request, res: Response) => {
   const {id} = req.params
   if (isNaN(+id)) {
       return res.status(400).json({ message: 'El id debe ser un numero' })
   }

   this.userService.deleteUser(+id)
       .then(deleteUser=> res.status(204).json(deleteUser))
       .catch((err:unknown)=> res.status(500).json(err))
}

}