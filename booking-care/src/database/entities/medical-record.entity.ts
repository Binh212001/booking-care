import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';
import { Appointment } from './appointment.entity';
import { Treatment } from './treatment.entity';

@Entity('medical_records')
export class MedicalRecord extends AbstractEntity {
  @Column({ type: 'uuid' })
  patientId: string; // ID bệnh nhân

  @Column({ type: 'uuid' })
  doctorId: string; // ID bác sĩ

  @Column({ type: 'uuid', nullable: true })
  appointmentId: string; // ID lịch hẹn

  @Column({ type: 'text', nullable: true })
  chiefComplaint: string; // Lý do đến khám

  @Column({ type: 'text', nullable: true })
  presentIllness: string; // Bệnh sử hiện tại

  @Column({ type: 'text', nullable: true })
  examination: string; // Khám lâm sàng

  // Khám mắt - Thị lực
  @Column({ type: 'varchar', length: 20, nullable: true })
  rightEyeVisualAcuity: string; // Thị lực mắt phải không kính (ví dụ: 20/20, 6/6)

  @Column({ type: 'varchar', length: 20, nullable: true })
  leftEyeVisualAcuity: string; // Thị lực mắt trái không kính

  @Column({ type: 'varchar', length: 20, nullable: true })
  rightEyeVisualAcuityCorrected: string; // Thị lực mắt phải có kính

  @Column({ type: 'varchar', length: 20, nullable: true })
  leftEyeVisualAcuityCorrected: string; // Thị lực mắt trái có kính

  // Khám mắt - Nhãn áp
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  rightEyePressure: number; // Nhãn áp mắt phải (mmHg)

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  leftEyePressure: number; // Nhãn áp mắt trái (mmHg)

  // Khám mắt - Khúc xạ
  @Column({ type: 'varchar', length: 50, nullable: true })
  rightEyeRefraction: string; // Khúc xạ mắt phải (ví dụ: -2.5/-0.5x180)

  @Column({ type: 'varchar', length: 50, nullable: true })
  leftEyeRefraction: string; // Khúc xạ mắt trái

  // Khám mắt - Khám đáy mắt
  @Column({ type: 'text', nullable: true })
  rightEyeFundus: string; // Khám đáy mắt phải

  @Column({ type: 'text', nullable: true })
  leftEyeFundus: string; // Khám đáy mắt trái

  // Khám mắt - Khác
  @Column({ type: 'text', nullable: true })
  eyeExamination: string; // Khám mắt chi tiết (giác mạc, mống mắt, đồng tử, v.v.)

  @Column({ type: 'text', nullable: true })
  diagnosis: string; // Chẩn đoán

  @Column({ type: 'text', nullable: true })
  treatmentPlan: string; // Kế hoạch điều trị

  @Column({ type: 'text', nullable: true })
  notes: string; // Ghi chú

  @Column({ type: 'varchar', length: 50, nullable: true })
  recordNumber: string; // Số hồ sơ

  @Column({ type: 'enum', enum: ['new', 'in_progress', 'completed', 'cancelled'], default: 'new' })
  status: string; // Trạng thái hồ sơ

  @ManyToOne(() => Patient, (patient) => patient.medicalRecords)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.medicalRecords)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @ManyToOne(() => Appointment, { nullable: true })
  @JoinColumn({ name: 'appointmentId' })
  appointment: Appointment;

  @OneToMany(() => Treatment, (treatment) => treatment.medicalRecord)
  treatments: Treatment[];
}

