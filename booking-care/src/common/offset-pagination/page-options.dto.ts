import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum TypeMatch {
  MATCH = 'MATCH',
  LIKE = 'LIKE',
}

export class PageOptionsDto {
  @ApiPropertyOptional({ minimum: 1, default: 10, type: Number })
  @IsOptional()
  readonly limit?: number = 10;

  @ApiPropertyOptional({ enum: TypeMatch, default: TypeMatch.MATCH })
  @IsOptional()
  readonly typeMatch?: TypeMatch = TypeMatch.MATCH;

  @ApiPropertyOptional({ minimum: 1, default: 1, type: Number })
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({ type: String, required: false })
  @IsOptional()
  readonly q?: string;

  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({ type: Boolean, default: false, required: false })
  @IsOptional()
  readonly takeAll?: boolean = false;

  get offset(): number {
    const pageValue = this.page ?? 1;
    const limitValue = this.limit ?? 10;
    return (pageValue > 0 ? pageValue - 1 : 0) * limitValue;
  }
}
