import { User } from "../../data"

enum UseRole {
    EMPLOYEE = 'EMPLOYEE',
    CLIENT = 'CLIENT',
}

enum UserStatus {
    ACTIVE = ' ACTIVE',
    DISABLED = 'DISABLED',
}

export class UserService {

    constructor() {

    }

    async createUser(userData: any){
    const user = new User()


    user.name = userData.name.toLocaleLowerCase().trim()
    user.email = userData.email.toLocaleLowerCase().trim()
    user.password = userData.password.trim()
    user.rol = UseRole.CLIENT

        try {
        return await user.save()

        } catch (error) {
            console.log(error)
        }
    }
}