import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.model";


enum RepairsStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}


@Entity()
export class Repairs extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string

    @Column({
        type: 'date',
        nullable: false,
    })
    date: string

    @Column({
        enum: RepairsStatus,
        nullable: false,
        default: RepairsStatus.PENDING
    })
    status: RepairsStatus

    @ManyToOne(() => User, (user) => user.repairs)
    user: User

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date
}