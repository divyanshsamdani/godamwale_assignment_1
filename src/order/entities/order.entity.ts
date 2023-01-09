
import { Status } from "src/grn/entities/grn.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { OrderLineItem } from "./orderLineItem.entity";



@Entity('order') 
export class Order extends BaseEntity{
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
    customerName: string;

    @Column({
        type: 'text'
    })
    customerFullAddress: string;

    @OneToMany(() => OrderLineItem, (orderLineItem) => orderLineItem.order)
    orderLineItems: OrderLineItem[];

    @Column({
        type: 'date'
    })
    date: string;
};
