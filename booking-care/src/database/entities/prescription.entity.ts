import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';
import { Appointment } from './appointment.entity';
import { PrescriptionMedicine } from './prescription-medicine.entity';

@Entity('prescriptions')
export class Prescription extends AbstractEntity {
  @Column({ type: 'uuid' })
  patientId: string; // ID bệnh nhân

  @Column({ type: 'uuid' })
  doctorId: string; // ID bác sĩ

  @Column({ type: 'uuid', nullable: true })
  appointmentId: string; // ID lịch hẹn

  @Column({ type: 'varchar', length: 50, nullable: true })
  prescriptionNumber: string; // Số đơn thuốc

  @Column({ type: 'text', nullable: true })
  diagnosis: string; // Chẩn đoán

  @Column({ type: 'text', nullable: true })
  notes: string; // Ghi chú

  @Column({ type: 'enum', enum: ['pending', 'filled', 'cancelled'], default: 'pending' })
  status: string; // Trạng thái (chờ, đã kê, hủy)

  @Column({ type: 'timestamp', nullable: true })
  filledAt: Date; // Ngày kê thuốc

  @ManyToOne(() => Patient, (patient) => patient.prescriptions)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.prescriptions)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @ManyToOne(() => Appointment, { nullable: true })
  @JoinColumn({ name: 'appointmentId' })
  appointment: Appointment;

  @OneToMany(() => PrescriptionMedicine, (prescriptionMedicine) => prescriptionMedicine.prescription, { cascade: true })
  prescriptionMedicines: PrescriptionMedicine[];
}

