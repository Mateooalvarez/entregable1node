

export class LoginUserDto{

    constructor(
        public readonly email: string,
        public readonly password: string
    ){}
    static login(obj: {[key: string]: any}): [string?, LoginUserDto?]{
    const {email, password} = obj;
    if (!email) return ['missing email']
    if (!password) return ['missing password']
    return [undefined, new LoginUserDto(email, password)]
     }
}