import { IsNotEmpty } from "class-validator";

export class CreateItemDto {

    @IsNotEmpty()
    productName: string;

    @IsNotEmpty()
    quantity: number;
    
    @IsNotEmpty()
    stockPrice: number;
    
    @IsNotEmpty()
    sellPrice: number;
}
