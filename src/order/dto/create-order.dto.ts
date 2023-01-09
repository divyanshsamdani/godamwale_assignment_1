import { IsNotEmpty, isNotEmpty, IsNumber } from "class-validator";
import { CreateOrderLineItemDto } from "./create-orderLineItem.dto";

export class CreateOrderDto {

    @IsNotEmpty()
    invoiceNumber: number;

    @IsNotEmpty()
    customerName: string;

    @IsNotEmpty()
    customerFullAddress: string;

    orderLineItems: CreateOrderLineItemDto[];
    
    @IsNotEmpty()
    date: string;
}
