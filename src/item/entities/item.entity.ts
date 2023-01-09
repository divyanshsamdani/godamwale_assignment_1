import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('item') 
export class Item extends BaseEntity{
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
    productName: string;  /// unique

    @Column()
    quantity: number;

    @Column()
    stockPrice: number;

    @Column()
    sellPrice: number;
};