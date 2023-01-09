import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Order } from "./order.entity";

@Entity('orderLineItem') 
export class OrderLineItem extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column(
        {type: 'boolean',default: 0}
    )
    deleted: boolean;

    @Column()
    productName: string;

    @Column()
    quantity: number;

    @Column()
    sellPrice: number;

    @ManyToOne(() => Order, (order) => order.orderLineItems, {orphanedRowAction: 'delete'})
    order:Order
};