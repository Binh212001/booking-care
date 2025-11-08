# Database Migrations

Thư mục này chứa các file migration cho database.

## Các lệnh migration

### Tạo migration mới (tự động generate từ entities)

```bash
npm run migration:generate -- src/database/migrations/MigrationName
```

Ví dụ:

```bash
npm run migration:generate -- src/database/migrations/AddUserTable
```

### Tạo file migration trống (để viết migration thủ công)

```bash
npm run migration:create -- src/database/migrations/MigrationName
```

Ví dụ:

```bash
npm run migration:create -- src/database/migrations/AddIndexToUsers
```

### Chạy migrations

```bash
npm run migration:run
```

### Revert migration cuối cùng

```bash
npm run migration:revert
```

### Xem trạng thái migrations

```bash
npm run migration:show
```

## Cấu trúc file migration

Mỗi file migration có cấu trúc như sau:

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationName1234567890 implements MigrationInterface {
  name = 'MigrationName1234567890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Code để thực hiện migration
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Code để revert migration
  }
}
```

## Lưu ý

- Luôn tạo migration mới khi thay đổi schema
- Không chỉnh sửa migration đã chạy trong production
- Test migration trên môi trường development trước khi deploy
- Backup database trước khi chạy migration trong production
- Đảm bảo file `.env` có đầy đủ thông tin kết nối database:
  - `DB_HOST`
  - `DB_PORT`
  - `DB_USER`
  - `DB_PASS`
  - `DB_NAME`
