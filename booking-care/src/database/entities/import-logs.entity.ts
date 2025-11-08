import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';

export interface ImportLogError {
  row: number;
  column: string;
  error: string;
}

@Entity('import_logs')
export class ImportLogs extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  type: string; // Loại import

  @Column({ type: 'int' })
  successCount: number; // Số lượng thành công

  @Column({ type: 'int' })
  errorCount: number; // Số lượng lỗi

  @Column({ type: 'int' })
  totalCount: number; // Tổng số lượng

  @Column({ type: 'jsonb' })
  errors: ImportLogError[]; // Thông tin lỗi: dòng nào, cột nào, lỗi gì
}
