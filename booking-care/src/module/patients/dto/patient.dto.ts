import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/common/offset-pagination/page-options.dto';

export class PatientReqDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

