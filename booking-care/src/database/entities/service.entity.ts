import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { Appointment } from './appointment.entity';

@Entity('services')
export class Service extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string; // Tên dịch vụ

  @Column({ type: 'varchar', length: 50, nullable: true })
  code: string; // Mã dịch vụ

  @Column({ type: 'text', nullable: true })
  description: string; // Mô tả dịch vụ

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number; // Giá dịch vụ

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit: string; // Đơn vị tính

  @Column({ type: 'int', default: 30 })
  duration: number; // Thời gian (phút)

  @Column({ type: 'enum', enum: ['examination', 'surgery', 'test', 'consultation', 'other'] })
  type: string; // Loại dịch vụ

  @Column({ type: 'enum', enum: ['general_eye_exam', 'refraction', 'slit_lamp', 'fundus_exam', 'tonometry', 'visual_field', 'cataract_surgery', 'lasik', 'prk', 'glaucoma_treatment', 'retinal_surgery', 'corneal_transplant', 'other'], nullable: true })
  eyeServiceType: string; // Loại dịch vụ mắt cụ thể (khám tổng quát, đo khúc xạ, khám khe đèn, khám đáy mắt, đo nhãn áp, thị trường, phẫu thuật đục thủy tinh thể, LASIK, PRK, điều trị glocom, phẫu thuật võng mạc, ghép giác mạc, khác)

  @Column({ type: 'boolean', default: true })
  isActive: boolean; // Trạng thái hoạt động

  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments: Appointment[];
}

