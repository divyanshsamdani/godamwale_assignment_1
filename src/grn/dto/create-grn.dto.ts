import { IsNotEmpty, IsNumber } from "class-validator";
import { GrnLineItem } from "../entities/grnLineItem.entity";
import { CreateGrnLineItemDto } from "./create-grnLineItem.dto";

export class CreateGrnDto {
    @IsNotEmpty()
    invoiceNumber: number;

    @IsNotEmpty()
    vendorName: string;

    @IsNotEmpty()
    vendorFullAddress: string;
    
    grnLineItems: CreateGrnLineItemDto[];

    date: string;
}
