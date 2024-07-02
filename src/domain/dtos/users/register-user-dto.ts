import { regularExps } from "../../../config/regular.exp";


export class RegisterDto {
    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: string
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterDto?] {
        const { name, email, password, role } = object;
    
        if (!name) return ["The name is required", undefined];
        if (!email) return ["The email is required", undefined];
        if (!password) return ["The password is required", undefined];
        if (!role) return ["The role is required", undefined];
    
        if (!regularExps.email.test(email)) {
            return ['Invalid email format'];
        }
    
        if (!regularExps.password.test(password)) {
            return ['The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'];
        }
            return [undefined, new RegisterDto(name, email, password, role)];
    }    
}