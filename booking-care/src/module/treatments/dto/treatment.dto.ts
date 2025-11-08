import { IsOptional, IsUUID } from 'class-validator';
import { PageOptionsDto } from 'src/common/offset-pagination/page-options.dto';
export class TreatmentReqDto extends PageOptionsDto {
  @IsUUID()
  @IsOptional()
  medicalRecordId?: string;
}
