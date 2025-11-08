import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { Doctor } from './doctor.entity';

@Entity('departments')
export class Department extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string; // Tên khoa

  @Column({ type: 'text', nullable: true })
  description: string; // Mô tả khoa

  @Column({ type: 'varchar', length: 50, nullable: true })
  code: string; // Mã khoa

  @Column({ type: 'boolean', default: true })
  isActive: boolean; // Trạng thái hoạt động

  @OneToMany(() => Doctor, (doctor) => doctor.department)
  doctors: Doctor[];
}
