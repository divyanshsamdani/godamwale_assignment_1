import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderLineItemDto{
    @IsNotEmpty()
    productName: string;

    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    sellPrice: number;
}