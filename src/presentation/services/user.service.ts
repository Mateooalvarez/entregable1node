import { bcryptAdapter } from "../../config/Bycript.adapter"
import { JwtAdapter } from "../../config/jwt.adapter"
import { User } from "../../data"
import { LoginUserDto } from "../../domain/dtos/users/login-user-dto"
import { UpdateUserDto } from "../../domain/dtos/users/update-user-dto"
import { CustomError } from "../../domain/errors/custom-errors"



enum UseRole {
    EMPLOYEE = 'EMPLOYEE',
    CLIENT = 'CLIENT',
}

enum UserStatus {
    ACTIVE = ' ACTIVE',
    DISABLED = 'DISABLED',
}

export class UserService {

    constructor() {}

    async createUser(userData: any){
    const user = new User()


    user.name = userData.name.toLocaleLowerCase().trim()
    user.email = userData.email.toLocaleLowerCase().trim()
    user.password = userData.password.trim()
    user.role = UseRole.CLIENT

        try {
        return await user.save()

        } catch (error) {
            console.log(error)
        }
    }

    async findAllUsers (){
        try {
            return await User.find({
                where : {
                    status : UserStatus.ACTIVE
                }
            })
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong! 🧨")
        }
     }

     async findOneUser (id:number){
        const user =  await User.findOne({
            where :{
                status :  UserStatus.ACTIVE
            }
        })
        if(!id){
           throw CustomError.notFound(`videogame with id ${id} not found`)
        }
       return user
    }

    async updateUser (userData:UpdateUserDto, id : number){
    const user  = await this.findOneUser(id)

    user!.name  = userData.name.toLocaleLowerCase().trim();
    user!.email  = userData.email.toLocaleLowerCase().trim();
    user!.role  = userData.role.trim();
    try {
        return await user?.save()
    } catch (error) {
        throw CustomError.internalServer("Something went very wrong! 🧨")
    }
}
    async deleteUser(id:number){
        const user = await this.findOneUser(id);
        user!.status = UserStatus.DISABLED
        try {
            return user?.save()
        } catch (error) {
            throw CustomError.internalServer("Something went very wrong! 🧨")
        }
     }

     async findUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
        const user = await this.findUserByEmailAndPassword(email, password)
        if (!user) {
            return null
        }
        return user
     }

     async loginUser(loginUsers: LoginUserDto){
        const user = await User.findOne({
            where:{
                email: loginUsers.email,
                status: UserStatus.ACTIVE,
            }
        })
        if (!user) throw CustomError.unAuthorized('invalid credentials')
            const comparatepassword = bcryptAdapter.compare(loginUsers.password, user.password)

        if (!comparatepassword)  throw CustomError.unAuthorized('invalid password')

        const token = await JwtAdapter.generateToken({id: user.id})

        if (!token) throw CustomError.unAuthorized('error build create token')

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
            }
     }
}