import { Entity, Column, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { Doctor } from './doctor.entity';
import { Patient } from './patient.entity';

@Entity('users')
export class User extends AbstractEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  username: string; // Tên đăng nhập

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string; // Email

  @Column({ type: 'varchar', length: 255 })
  password: string; // Mật khẩu (đã hash)

  @Column({
    type: 'enum',
    enum: ['admin', 'doctor', 'patient'],
    default: 'patient',
  })
  role: string; // Vai trò

  @Column({ type: 'boolean', default: true })
  isActive: boolean; // Trạng thái hoạt động

  // One-to-One: Một user có thể là một bác sĩ
  @OneToOne(() => Doctor, (doctor) => doctor.user, {
    nullable: true,
  })
  doctor: Doctor;

  // One-to-One: Một user có thể là một bệnh nhân
  @OneToOne(() => Patient, (patient) => patient.user, {
    nullable: true,
  })
  patient: Patient;
}
