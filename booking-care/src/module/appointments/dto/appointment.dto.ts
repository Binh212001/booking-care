import { IsDateString, IsOptional, IsUUID } from 'class-validator';
import { PageOptionsDto } from 'src/common/offset-pagination/page-options.dto';

export class AppointmentReqDto extends PageOptionsDto {
  @IsUUID()
  @IsOptional()
  patientId?: string;
  @IsUUID()
  @IsOptional()
  doctorId?: string;
  @IsUUID()
  @IsOptional()
  serviceId?: string;
  @IsDateString()
  @IsOptional()
  appointmentDate?: Date;
  @IsDateString()
  @IsOptional()
  startTime?: Date;
  @IsDateString()
  @IsOptional()
  endTime?: Date;
}
