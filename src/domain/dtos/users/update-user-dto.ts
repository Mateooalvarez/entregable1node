import { regularExps } from "../../../config/regular.exp";


export class UpdateUserDto {
    private constructor(
        public readonly name : string,
        public readonly email :string,
        public readonly role  : string
    ){}


    static update(object : {[key :string]:any}) : [string?, UpdateUserDto?]{
        const {name, email, role} = object;

        if(!name) return ["Missing name", undefined];
        if(!role) return ["Missing role", undefined];
        if(role !== "CLIENT" && role !== "EMPLOYEE") return["CLIENT or EMPLOYEE", undefined];
        if(!regularExps.email.test(email)) return ['Invalid email'];

        return  [undefined,new UpdateUserDto(name, email, role)]
    }
}