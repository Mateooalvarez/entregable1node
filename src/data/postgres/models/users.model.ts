import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
        default: UserStatus.ACTIVE
    })
    status: UserStatus

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date
}