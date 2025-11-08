import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/common/offset-pagination/page-options.dto';

export class MedicineReqDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  manufacturer?: string;
}

