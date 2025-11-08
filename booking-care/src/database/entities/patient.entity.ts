import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { Appointment } from './appointment.entity';
import { MedicalRecord } from './medical-record.entity';
import { Prescription } from './prescription.entity';
import { User } from './user.entity';

@Entity('patients')
export class Patient extends AbstractEntity {
  @Column({ type: 'varchar', length: 100 })
  fullName: string; // Họ và tên

  @Column({ type: 'varchar', length: 20, unique: true })
  phone: string; // Số điện thoại

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string; // Email

  @Column({ type: 'enum', enum: ['male', 'female', 'other'] })
  gender: string; // Giới tính

  @Column({ type: 'date' })
  dateOfBirth: Date; // Ngày sinh

  @Column({ type: 'varchar', length: 20, nullable: true })
  identityCard: string; // CMND/CCCD

  @Column({ type: 'text', nullable: true })
  address: string; // Địa chỉ

  @Column({ type: 'varchar', length: 50, nullable: true })
  bloodType: string; // Nhóm máu

  @Column({ type: 'text', nullable: true })
  medicalHistory: string; // Tiền sử bệnh lý

  @Column({ type: 'text', nullable: true })
  allergy: string; // Dị ứng

  @Column({ type: 'text', nullable: true })
  eyeHistory: string; // Tiền sử bệnh mắt (cận thị, viễn thị, loạn thị, đục thủy tinh thể, glocom, v.v.)

  @Column({ type: 'boolean', default: false })
  wearsGlasses: boolean; // Có đeo kính không

  @Column({ type: 'boolean', default: false })
  wearsContactLens: boolean; // Có đeo kính áp tròng không

  @Column({ type: 'varchar', length: 50, nullable: true })
  rightEyePower: string; // Độ kính mắt phải (ví dụ: -2.5D)

  @Column({ type: 'varchar', length: 50, nullable: true })
  leftEyePower: string; // Độ kính mắt trái

  @Column({ type: 'varchar', length: 255, nullable: true })
  emergencyContact: string; // Người liên hệ khẩn cấp

  @Column({ type: 'varchar', length: 20, nullable: true })
  emergencyPhone: string; // Số điện thoại người liên hệ khẩn cấp

  @Column({ type: 'uuid', nullable: true })
  userId: string; // ID user

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.patient)
  medicalRecords: MedicalRecord[];

  @OneToMany(() => Prescription, (prescription) => prescription.patient)
  prescriptions: Prescription[];

  // One-to-One: Một bệnh nhân liên kết với một user
  @OneToOne(() => User, (user) => user.patient, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;
}
