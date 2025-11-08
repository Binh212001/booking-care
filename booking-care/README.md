<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Coding Standards & Best Practices

### 📋 Mục lục

1. [Quy tắc đặt tên (Naming Conventions)](#quy-tắc-đặt-tên)
2. [Cấu trúc thư mục (File Structure)](#cấu-trúc-thư-mục)
3. [Entity (Database Entities)](#entity-database-entities)
4. [DTO (Data Transfer Objects)](#dto-data-transfer-objects)
5. [Service Layer](#service-layer)
6. [Controller Layer](#controller-layer)
7. [Repository Pattern](#repository-pattern)
8. [Error Handling](#error-handling)
9. [Code Style](#code-style)
10. [Best Practices](#best-practices)

---

### Quy tắc đặt tên

#### Files & Folders

- **Files**: Sử dụng `kebab-case` cho tên file
  - ✅ `create-doctor.dto.ts`
  - ✅ `doctors.service.ts`
  - ✅ `medical-record.entity.ts`
  - ❌ `createDoctor.dto.ts`
  - ❌ `DoctorsService.ts`

- **Folders**: Sử dụng `kebab-case`
  - ✅ `medical-records/`
  - ✅ `prescription-medicines/`
  - ❌ `medicalRecords/`

#### Classes

- **Entities**: PascalCase, số ít
  - ✅ `Doctor`, `Patient`, `Appointment`
  - ❌ `Doctors`, `doctor`, `Appointments`

- **DTOs**: PascalCase với suffix `Dto`
  - ✅ `CreateDoctorDto`, `UpdateDoctorDto`
  - ❌ `CreateDoctor`, `doctorDto`

- **Services**: PascalCase với suffix `Service`
  - ✅ `DoctorsService`, `PatientsService`
  - ❌ `DoctorService`, `doctorsService`

- **Controllers**: PascalCase với suffix `Controller`
  - ✅ `DoctorsController`, `AppointmentsController`

- **Repositories**: PascalCase với suffix `Repository`
  - ✅ `DoctorRepository`, `PatientRepository`

#### Variables & Functions

- **Variables**: camelCase
  - ✅ `doctorId`, `appointmentDate`, `isActive`
  - ❌ `doctor_id`, `DoctorId`, `IsActive`

- **Functions/Methods**: camelCase với động từ mô tả
  - ✅ `findAll()`, `create()`, `findOne()`, `update()`, `remove()`
  - ✅ `getDoctorById()`, `validateAppointment()`
  - ❌ `get_all()`, `Create()`, `find_doctor()`

- **Constants**: UPPER_SNAKE_CASE
  - ✅ `MAX_FILE_SIZE`, `DEFAULT_PAGE_SIZE`
  - ❌ `maxFileSize`, `defaultPageSize`

- **Private properties**: camelCase với prefix `_` (optional)
  - ✅ `private readonly _doctorRepository`
  - ✅ `private readonly doctorRepository` (cũng được chấp nhận)

---

### Cấu trúc thư mục

```
src/
├── common/                 # Shared utilities, base classes
│   ├── abstract.entity.ts
│   └── base.repository.ts
├── database/
│   ├── entities/          # TypeORM entities
│   │   ├── doctor.entity.ts
│   │   └── index.ts
│   ├── repositories/      # Custom repositories
│   │   └── doctor.repository.ts
│   └── database.service.ts
├── module/                # Feature modules
│   └── doctors/
│       ├── dto/
│       │   ├── create-doctor.dto.ts
│       │   └── update-doctor.dto.ts
│       ├── doctors.controller.ts
│       ├── doctors.module.ts
│       └── doctors.service.ts
└── main.ts
```

#### Quy tắc

- Mỗi module phải có thư mục riêng trong `module/`
- DTOs đặt trong thư mục `dto/` của module
- Entities đặt trong `database/entities/`
- Repositories đặt trong `database/repositories/`

---

### Entity (Database Entities)

###Dinh ngia field relation gan voi id cua chung

@Column({ type: 'uuid' })
doctorId: string; // ID bác sĩ

@ManyToOne(() => Doctor, (doctor) => doctor.appointments)
@JoinColumn({ name: 'doctorId' })
doctor: Relation<Doctor>;

#### Quy tắc chung

1. **Kế thừa từ AbstractEntity**

   ```typescript
   @Entity('doctors')
   export class Doctor extends AbstractEntity {
     // ...
   }
   ```

2. **Sử dụng decorators đúng cách**

   ```typescript
   @Column({ type: 'varchar', length: 100 })
   fullName: string;

   @Column({ type: 'varchar', length: 255, nullable: true })
   email: string;

   @Column({ type: 'boolean', default: true })
   isActive: boolean;
   ```

3. **Định nghĩa quan hệ rõ ràng**

   ```typescript
   // Many-to-One
   @ManyToOne(() => Department, (department) => department.doctors)
   @JoinColumn({ name: 'departmentId' })
   department: Department;

   // One-to-Many
   @OneToMany(() => Appointment, (appointment) => appointment.doctor)
   appointments: Appointment[];
   ```

4. **Comment bằng tiếng Việt cho các field quan trọng**

   ```typescript
   @Column({ type: 'uuid' })
   doctorId: string; // ID bác sĩ

   @Column({ type: 'timestamp' })
   appointmentDate: Date; // Ngày giờ hẹn
   ```

5. **Sử dụng enum cho các giá trị cố định**
   ```typescript
   @Column({
     type: 'enum',
     enum: ['pending', 'confirmed', 'completed', 'cancelled'],
     default: 'pending',
   })
   status: string;
   ```

#### Best Practices

- ✅ Luôn đặt `nullable: true` cho các field optional
- ✅ Sử dụng `uuid` cho primary keys và foreign keys
- ✅ Đặt độ dài tối đa cho `varchar` fields
- ✅ Sử dụng `timestamp` cho dates với timezone
- ✅ Sử dụng `text` cho các field có thể dài
- ❌ Tránh sử dụng `any` type
- ❌ Tránh đặt tên field trùng với reserved keywords

---

### DTO (Data Transfer Objects)

#### Quy tắc chung

1. **Validation với class-validator**

   ```typescript
   export class CreateDoctorDto {
     @ApiProperty({ description: 'Họ và tên', example: 'Nguyễn Văn A' })
     @IsString()
     @MaxLength(100)
     fullName: string;

     @ApiProperty({ description: 'Email', example: 'doctor@example.com' })
     @IsEmail()
     @MaxLength(255)
     email: string;
   }
   ```

2. **Swagger documentation**
   - Luôn sử dụng `@ApiProperty` hoặc `@ApiPropertyOptional`
   - Thêm `description` và `example` cho mỗi field
   - Sử dụng `@ApiPropertyOptional` cho các field optional

3. **Naming conventions**
   - Create DTO: `Create[Entity]Dto`
   - Update DTO: `Update[Entity]Dto`
   - Extend từ `PartialType` cho Update DTO:
     ```typescript
     export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
     ```

4. **Validation rules**
   - ✅ Luôn validate required fields với `@IsNotEmpty()` hoặc `@IsString()`
   - ✅ Sử dụng `@IsOptional()` cho optional fields
   - ✅ Validate format với `@IsEmail()`, `@IsUUID()`, `@Matches()`
   - ✅ Validate length với `@MinLength()`, `@MaxLength()`
   - ✅ Validate enum với `@IsEnum()`

#### Best Practices

- ✅ Tách riêng Create và Update DTOs
- ✅ Sử dụng `PartialType` từ `@nestjs/mapped-types` để tái sử dụng
- ✅ Validate tất cả inputs từ client
- ✅ Thêm Swagger decorators cho API documentation
- ❌ Không expose internal entity fields trong DTOs
- ❌ Tránh validation logic phức tạp trong DTOs (nên đặt trong service)

---

### Service Layer

#### Quy tắc chung

1. **Dependency Injection**

   ```typescript
   @Injectable()
   export class DoctorsService {
     constructor(private readonly doctorRepository: DoctorRepository) {}
   }
   ```

2. **Method naming**
   - `create()` - Tạo mới
   - `findAll()` - Lấy tất cả
   - `findOne(id)` - Lấy một bản ghi
   - `update(id, dto)` - Cập nhật
   - `remove(id)` - Xóa

3. **Error handling**

   ```typescript
   async findOne(id: string) {
     const doctor = await this.doctorRepository.findOne({
       where: { id },
       relations: ['department'],
     });

     if (!doctor) {
       throw new NotFoundException(`Doctor with ID ${id} not found`);
     }

     return doctor;
   }
   ```

4. **Relations loading**

   ```typescript
   async findAll() {
     return await this.doctorRepository.find({
       relations: ['department', 'appointments', 'medicalRecords'],
     });
   }
   ```

5. **Async/Await**
   - ✅ Luôn sử dụng `async/await` thay vì promises
   - ✅ Luôn `await` các database operations
   - ✅ Return trực tiếp từ repository methods

#### Best Practices

- ✅ Services chỉ chứa business logic
- ✅ Không chứa HTTP-specific code (để trong controller)
- ✅ Sử dụng repositories để truy cập database
- ✅ Validate inputs trước khi xử lý
- ✅ Throw appropriate exceptions (`NotFoundException`, `BadRequestException`)
- ✅ Sử dụng transactions cho các operations phức tạp
- ❌ Không throw generic `Error`
- ❌ Tránh business logic trong controllers

---

### Controller Layer

#### Quy tắc chung

1. **Decorators**

   ```typescript
   @ApiTags('Doctors')
   @Controller('doctors')
   export class DoctorsController {
     constructor(private readonly doctorsService: DoctorsService) {}
   }
   ```

2. **HTTP Methods**
   - `@Post()` - CREATE
   - `@Get()` - READ (all)
   - `@Get(':id')` - READ (one)
   - `@Patch(':id')` - UPDATE (partial)
   - `@Put(':id')` - UPDATE (full) - ít dùng
   - `@Delete(':id')` - DELETE

3. **HTTP Status Codes**

   ```typescript
   @Post()
   @HttpCode(HttpStatus.CREATED)
   create(@Body() createDoctorDto: CreateDoctorDto) {
     return this.doctorsService.create(createDoctorDto);
   }

   @Delete(':id')
   @HttpCode(HttpStatus.NO_CONTENT)
   remove(@Param('id') id: string) {
     return this.doctorsService.remove(id);
   }
   ```

4. **Swagger Documentation**

   ```typescript
   @Post()
   @ApiOperation({ summary: 'Tạo mới bác sĩ' })
   @ApiResponse({ status: 201, description: 'Tạo bác sĩ thành công' })
   @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
   create(@Body() createDoctorDto: CreateDoctorDto) {
     return this.doctorsService.create(createDoctorDto);
   }
   ```

5. **Parameter validation**
   ```typescript
   @Get(':id')
   findOne(@Param('id') id: string) {
     return this.doctorsService.findOne(id);
   }
   ```

#### Best Practices

- ✅ Controllers chỉ xử lý HTTP requests/responses
- ✅ Delegate business logic cho services
- ✅ Luôn document API với Swagger
- ✅ Sử dụng đúng HTTP status codes
- ✅ Validate route parameters
- ✅ Sử dụng DTOs cho request/response
- ❌ Không đặt business logic trong controllers
- ❌ Tránh trả về raw entities (sử dụng DTOs)

---

### Repository Pattern

#### Quy tắc chung

1. **Extend BaseRepository**

   ```typescript
   @Injectable()
   export class DoctorRepository extends BaseRepository<Doctor> {
     constructor(private readonly dataSource: DataSource) {
       super(Doctor, dataSource.createEntityManager());
     }
   }
   ```

2. **Custom queries**

   ```typescript
   async findByDepartment(departmentId: string): Promise<Doctor[]> {
     return this.find({
       where: { departmentId },
       relations: ['department'],
     });
   }
   ```

3. **Register trong Module**
   ```typescript
   @Module({
     imports: [TypeOrmModule.forFeature([Doctor])],
     providers: [DoctorRepository],
     // ...
   })
   ```

#### Best Practices

- ✅ Extend từ `BaseRepository<Entity>`
- ✅ Inject `DataSource` trong constructor
- ✅ Sử dụng TypeORM query methods
- ✅ Tạo custom methods cho complex queries
- ✅ Sử dụng relations khi cần
- ❌ Tránh raw SQL queries trừ khi cần thiết
- ❌ Không đặt business logic trong repositories

---

### Error Handling

#### Exception Types

1. **NotFoundException** - Resource không tồn tại

   ```typescript
   throw new NotFoundException(`Doctor with ID ${id} not found`);
   ```

2. **BadRequestException** - Invalid input

   ```typescript
   throw new BadRequestException('Invalid email format');
   ```

3. **ConflictException** - Resource conflict (duplicate)

   ```typescript
   throw new ConflictException('Email already exists');
   ```

4. **UnauthorizedException** - Authentication required

   ```typescript
   throw new UnauthorizedException('Invalid credentials');
   ```

5. **ForbiddenException** - Permission denied
   ```typescript
   throw new ForbiddenException('You do not have permission');
   ```

#### Best Practices

- ✅ Sử dụng NestJS built-in exceptions
- ✅ Cung cấp message rõ ràng, dễ hiểu
- ✅ Throw exceptions ở service layer
- ✅ Let NestJS handle exception transformation
- ❌ Không throw generic `Error`
- ❌ Tránh throw exceptions trong controllers (delegate to services)

---

### Code Style

#### Formatting

1. **Indentation**: 2 spaces
2. **Quotes**: Single quotes (`'`)
3. **Semicolons**: Required
4. **Trailing commas**: Always
5. **Line length**: Max 100 characters

#### Imports

```typescript
// 1. External packages
import { Injectable, NotFoundException } from '@nestjs/common';
import { Entity, Column, ManyToOne } from 'typeorm';

// 2. Internal modules
import { DoctorRepository } from '../../database/repositories/doctor.repository';
import { CreateDoctorDto } from './dto/create-doctor.dto';

// 3. Types (nếu có)
import type { Doctor } from '../../database/entities/doctor.entity';
```

#### Comments

```typescript
// ✅ Good: Comment giải thích "tại sao"
// Need to load department relation for display
const doctor = await this.repository.findOne({
  where: { id },
  relations: ['department'],
});

// ❌ Bad: Comment giải thích "cái gì" (code đã rõ ràng)
// Find doctor by id
const doctor = await this.repository.findOne({ where: { id } });
```

#### TypeScript

- ✅ Sử dụng explicit types cho function parameters và returns
- ✅ Sử dụng interfaces cho complex types
- ✅ Tránh `any` type
- ✅ Sử dụng `readonly` cho immutable properties
- ✅ Sử dụng optional chaining (`?.`) và nullish coalescing (`??`)

---

### Best Practices

#### General

1. **SOLID Principles**
   - Single Responsibility: Mỗi class chỉ có một lý do để thay đổi
   - Open/Closed: Mở rộng, đóng sửa đổi
   - Liskov Substitution: Subtypes phải thay thế được base types
   - Interface Segregation: Không force clients phụ thuộc vào interfaces không dùng
   - Dependency Inversion: Phụ thuộc vào abstractions, không phụ thuộc vào concretions

2. **DRY (Don't Repeat Yourself)**
   - Tái sử dụng code thông qua base classes, utilities
   - Tránh duplicate logic

3. **KISS (Keep It Simple, Stupid)**
   - Giữ code đơn giản, dễ hiểu
   - Tránh over-engineering

4. **YAGNI (You Aren't Gonna Need It)**
   - Chỉ implement những gì cần thiết
   - Tránh premature optimization

#### Security

- ✅ Validate và sanitize tất cả inputs
- ✅ Sử dụng parameterized queries (TypeORM tự động)
- ✅ Hash passwords với bcrypt
- ✅ Sử dụng JWT cho authentication
- ✅ Implement rate limiting
- ✅ CORS configuration
- ❌ Không expose sensitive data trong responses
- ❌ Không log sensitive information

#### Performance

- ✅ Sử dụng database indexes
- ✅ Eager loading chỉ khi cần
- ✅ Pagination cho large datasets
- ✅ Caching cho frequently accessed data
- ✅ Database connection pooling
- ❌ Tránh N+1 queries
- ❌ Tránh loading unnecessary relations

#### Testing

- ✅ Unit tests cho services
- ✅ Integration tests cho APIs
- ✅ Test coverage > 80%
- ✅ Mock dependencies trong tests
- ✅ Test error cases

#### Documentation

- ✅ Swagger documentation cho tất cả endpoints
- ✅ Comment cho complex logic
- ✅ README với setup instructions
- ✅ API documentation với examples

---

### Checklist trước khi commit

- [ ] Code đã được format với Prettier (`npm run format`)
- [ ] Code đã pass ESLint (`npm run lint`)
- [ ] Tất cả tests đều pass (`npm run test`)
- [ ] DTOs có validation đầy đủ
- [ ] Swagger documentation đã được cập nhật
- [ ] Error handling đã được implement
- [ ] Không có console.log trong production code
- [ ] Không có commented code không cần thiết
- [ ] Code đã được review

---

### Scripts hữu ích

```bash
# Format code
npm run format

# Lint code
npm run lint

# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Build project
npm run build

# Start development server
npm run start:dev
```

---

### Tài liệu tham khảo

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [class-validator](https://github.com/typestack/class-validator)
- [Swagger/OpenAPI](https://swagger.io/specification/)

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
