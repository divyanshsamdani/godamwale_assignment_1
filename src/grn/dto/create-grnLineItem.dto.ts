import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateGrnLineItemDto{
    @IsNotEmpty()
    productName: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    stockPrice: number;

    // @IsNotEmpty()
    // @IsNumber()
    // grnId: number;
}