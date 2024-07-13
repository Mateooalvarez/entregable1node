import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum Status {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED" 
}

@Entity()
export class Repairs extends BaseEntity{
    @PrimaryGeneratedColumn()
    id :  number;

    @Column({
        type :"enum",
        enum : Status,
        default : Status.PENDING
    })
    status : Status | string

    @Column({
        type : "varchar", 
        length : 60,
        nullable :  false, 
    })
    date  : Date | string;

    @CreateDateColumn()
    create_at : Date;

    @UpdateDateColumn()
    update_at : Date;
}