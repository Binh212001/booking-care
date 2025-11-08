import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserReqDto } from './dto/user.dto';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { User } from 'src/database/entities';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo mới user' })
  @ApiResponse({ status: 201, description: 'Tạo user thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiResponse({ status: 409, description: 'Username hoặc email đã tồn tại' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả users' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách users thành công',
  })
  findAll(@Query() userReqDto: UserReqDto): Promise<OffsetPaginatedDto<User>> {
    return this.usersService.findAll(userReqDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin user theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin user thành công',
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy user' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin user' })
  @ApiResponse({ status: 200, description: 'Cập nhật user thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy user' })
  @ApiResponse({ status: 409, description: 'Username hoặc email đã tồn tại' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa user' })
  @ApiResponse({ status: 204, description: 'Xóa user thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy user' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
