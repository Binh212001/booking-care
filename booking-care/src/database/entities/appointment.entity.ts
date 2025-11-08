import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';
import { Service } from './service.entity';

@Entity('appointments')
export class Appointment extends AbstractEntity {
  @Column({ type: 'uuid' })
  patientId: string; // ID bệnh nhân

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  @JoinColumn({ name: 'patientId' })
  patient: Relation<Patient>;

  @Column({ type: 'uuid' })
  doctorId: string; // ID bác sĩ

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: 'doctorId' })
  doctor: Relation<Doctor>;

  @Column({ type: 'uuid' })
  serviceId: string; // ID dịch vụ

  @ManyToOne(() => Service, (service) => service.appointments)
  @JoinColumn({ name: 'serviceId' })
  service: Relation<Service>;

  @Column({ type: 'timestamp' })
  appointmentDate: Date; // Ngày giờ hẹn

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string; // Trạng thái (chờ xác nhận, đã xác nhận, hoàn thành, hủy)

  @Column({ type: 'text', nullable: true })
  reason: string; // Lý do khám

  @Column({ type: 'text', nullable: true })
  notes: string; // Ghi chú

  @Column({ type: 'timestamp' })
  startTime: Date; // Thời gian bắt đầu

  @Column({ type: 'timestamp' })
  endTime: Date; // Thời gian kết thúc
}
