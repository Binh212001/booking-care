import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/common/offset-pagination/page-options.dto';

export class UserReqDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  role?: string;
}
