import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Grn } from "./grn.entity";

@Entity('grnLineItem') 
export class GrnLineItem extends BaseEntity{
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

    @Column()
    productName: string;

    @Column()
    quantity: number;

    @Column()
    stockPrice: number;

    @ManyToOne(() => Grn,(grn) => grn.grnLineItems,{orphanedRowAction: 'delete'})
    grn: Grn
};