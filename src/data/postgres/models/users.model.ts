import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Repairs } from "./repairs.model";
import { bcryptAdapter } from "../../../config";

enum UseRole {
    EMPLOYEE = 'EMPLOYEE',
    CLIENT = 'CLIENT',
}

enum UserStatus {
    ACTIVE = ' ACTIVE',
    DISABLED = 'DISABLED',
}


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string

    @Column({
        type: 'varchar',
        nullable: false,
        length: 120
    })
    name: string

    @Column({
        type: 'varchar',
        nullable: false,
        length: 120
    })
    email: string

    @Column({
        type: 'varchar',
        nullable: false,
        length: 255
    })
    password: string

    @Column({
        type  : "enum",
        enum : UseRole,
        default : UseRole.CLIENT
    })
    role  : UseRole | string;

    @Column({
        enum: UserStatus,
        nullable: false,
        default: UserStatus.ACTIVE no  })
    status: UserStatus

    @OneToMany(() => Repairs, (repairs) => repairs.user)
    repairs: Repairs[]

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date
}

@BeforeInsert()
    encryptPassword(){
        this.password =  bcryptAdapter.hash(this.password)
    };
