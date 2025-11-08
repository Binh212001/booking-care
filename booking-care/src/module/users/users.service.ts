import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Like } from 'typeorm';
import { UserReqDto } from './dto/user.dto';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { User } from 'src/database/entities';
import { paginate } from 'src/common/offset-pagination/offset-pagination';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    // Check if username already exists
    const existingUserByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUserByUsername) {
      throw new ConflictException(
        `User with username ${createUserDto.username} already exists`,
      );
    }

    // Check if email already exists
    const existingUserByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUserByEmail) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const userData = {
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || 'patient',
      isActive:
        createUserDto.isActive !== undefined ? createUserDto.isActive : true,
    };

    return await this.userRepository.save(userData);
  }

  async findAll(userReqDto: UserReqDto): Promise<OffsetPaginatedDto<User>> {
    const { username, email, role } = userReqDto;

    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.doctor', 'doctor')
      .leftJoinAndSelect('user.patient', 'patient');
    if (username) {
      query.andWhere('user.username LIKE :username', {
        username: `%${username}%`,
      });
    }
    if (email) {
      query.andWhere('user.email LIKE :email', { email: `%${email}%` });
    }
    if (role) {
      query.andWhere('user.role = :role', { role });
    }
    const [data, metaDto] = await paginate(query, userReqDto, {
      skipCount: false,
      takeAll: userReqDto.takeAll,
    });

    return new OffsetPaginatedDto<User>(data, metaDto);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['doctor', 'patient'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['doctor', 'patient'],
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['doctor', 'patient'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    // Check if username is being changed and already exists
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.userRepository.findOne({
        where: { username: updateUserDto.username },
      });
      if (existingUser) {
        throw new ConflictException(
          `User with username ${updateUserDto.username} already exists`,
        );
      }
    }

    // Check if email is being changed and already exists
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser) {
        throw new ConflictException(
          `User with email ${updateUserDto.email} already exists`,
        );
      }
    }

    // Hash password if it's being updated
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return await this.userRepository.softDelete(id);
  }
}
