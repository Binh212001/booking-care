import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { MedicalRecord } from './medical-record.entity';
import { Doctor } from './doctor.entity';

@Entity('treatments')
export class Treatment extends AbstractEntity {
  @Column({ type: 'uuid' })
  medicalRecordId: string; // ID hồ sơ bệnh án

  @Column({ type: 'uuid' })
  doctorId: string; // ID bác sĩ điều trị

  @Column({ type: 'varchar', length: 255 })
  name: string; // Tên điều trị

  @Column({ type: 'text', nullable: true })
  description: string; // Mô tả

  @Column({ type: 'timestamp' })
  startDate: Date; // Ngày bắt đầu

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date; // Ngày kết thúc

  @Column({ type: 'enum', enum: ['planned', 'in_progress', 'completed', 'cancelled'], default: 'planned' })
  status: string; // Trạng thái

  @Column({ type: 'enum', enum: ['medication', 'eye_drops', 'surgery', 'laser', 'injection', 'physical_therapy', 'follow_up', 'other'], nullable: true })
  treatmentType: string; // Loại điều trị (thuốc uống, thuốc nhỏ mắt, phẫu thuật, laser, tiêm, vật lý trị liệu, tái khám, khác)

  @Column({ type: 'text', nullable: true })
  result: string; // Kết quả

  @Column({ type: 'text', nullable: true })
  notes: string; // Ghi chú

  @ManyToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.treatments)
  @JoinColumn({ name: 'medicalRecordId' })
  medicalRecord: MedicalRecord;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;
}

