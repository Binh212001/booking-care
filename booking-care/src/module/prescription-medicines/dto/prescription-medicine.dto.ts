import { IsOptional, IsUUID } from 'class-validator';
import { PageOptionsDto } from 'src/common/offset-pagination/page-options.dto';

export class PrescriptionMedicineReqDto extends PageOptionsDto {
  @IsUUID()
  @IsOptional()
  prescriptionId?: string;

  @IsUUID()
  @IsOptional()
  medicineId?: string;
}

