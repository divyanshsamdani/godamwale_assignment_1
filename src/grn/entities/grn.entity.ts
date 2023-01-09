import { json } from "stream/consumers";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { GrnLineItem } from "./grnLineItem.entity";

export enum Status {
    gen = "GENERATED",
    com = "COMPLETED",
    can = "CANCELLED",
};

@Entity('grn') 
export class Grn extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column(
        {type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'}
    )
    createdAt: Date;

    @Column(
        {type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'}
    )
    updatedAt: Date;

    @Column(
        {type: 'boolean',default: 0}
    )
    deleted: boolean;

    @Column(
        {
            type: "enum", 
            enum: Status,
            default: Status.gen,
        }
    )
    status: Status;

    @Column()
    invoiceNumber: number;

    @Column({
        type: 'varchar'
    })
    vendorName: string;

    @Column({
        type: 'text'
    })
    vendorFullAddress: string;

    @OneToMany(() => GrnLineItem, (grnLineItem) => grnLineItem.grn)
    grnLineItems: GrnLineItem[];
    
    @Column({
        type: 'date'
    })
    date: string;
};
