import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { Appointment } from './appointment.entity';
import { Department } from './department.entity';
import { MedicalRecord } from './medical-record.entity';
import { Prescription } from './prescription.entity';
import { User } from './user.entity';

@Entity('doctors')
export class Doctor extends AbstractEntity {
  @Column({ type: 'varchar', length: 20, unique: true })
  code: string; // Mã bác sĩ

  @Column({ type: 'varchar', length: 100 })
  fullName: string; // Họ và tên

  @Column({ type: 'varchar', length: 20, unique: true })
  phone: string; // Số điện thoại

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string; // Email

  @Column({ type: 'varchar', length: 20, nullable: true })
  licenseNumber: string; // Số chứng chỉ hành nghề

  @Column({ type: 'varchar', length: 100, nullable: true })
  specialization: string; // Chuyên khoa

  @Column({ type: 'varchar', length: 50, nullable: true })
  degree: string; // Học vị (Thạc sĩ, Tiến sĩ, ...)

  @Column({ type: 'text', nullable: true })
  experience: string; // Kinh nghiệm

  @Column({ type: 'enum', enum: ['male', 'female', 'other'], nullable: true })
  gender: string; // Giới tính

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date; // Ngày sinh

  @Column({ type: 'text', nullable: true })
  address: string; // Địa chỉ

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string; // Ảnh đại diện

  @Column({ type: 'boolean', default: true })
  isActive: boolean; // Trạng thái hoạt động

  @Column({ type: 'uuid', nullable: true })
  departmentId: string; // ID khoa

  @Column({ type: 'uuid', nullable: true })
  userId: string; // ID user

  // Many-to-One: Một bác sĩ thuộc một khoa/phòng
  @ManyToOne(() => Department, (department) => department.doctors, {
    eager: true,
  })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  // One-to-One: Một bác sĩ liên kết với một user
  @OneToOne(() => User, (user) => user.doctor)
  @JoinColumn({ name: 'userId' })
  user: User;

  // One-to-Many: Một bác sĩ có nhiều lịch hẹn (bệnh nhân)
  // Many-to-Many với Patient: Bác sĩ khám nhiều bệnh nhân, bệnh nhân có thể khám nhiều bác sĩ (qua Appointment)
  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  // One-to-Many: Bác sĩ tạo hồ sơ bệnh án cho bệnh nhân
  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.doctor)
  medicalRecords: MedicalRecord[];

  // One-to-Many: Bác sĩ kê đơn nhiều lần cho bệnh nhân
  @OneToMany(() => Prescription, (prescription) => prescription.doctor)
  prescriptions: Prescription[];
}
