import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { Prescription } from './prescription.entity';
import { Medicine } from './medicine.entity';

@Entity('prescription_medicines')
export class PrescriptionMedicine extends AbstractEntity {
  @Column({ type: 'uuid' })
  prescriptionId: string; // ID đơn thuốc

  @Column({ type: 'uuid' })
  medicineId: string; // ID thuốc

  @Column({ type: 'int' })
  quantity: number; // Số lượng

  @Column({ type: 'varchar', length: 255, nullable: true })
  dosage: string; // Liều dùng

  @Column({ type: 'varchar', length: 255, nullable: true })
  frequency: string; // Tần suất (ví dụ: 2 lần/ngày)

  @Column({ type: 'varchar', length: 255, nullable: true })
  duration: string; // Thời gian dùng (ví dụ: 7 ngày)

  @Column({ type: 'text', nullable: true })
  notes: string; // Ghi chú

  @ManyToOne(() => Prescription, (prescription) => prescription.prescriptionMedicines)
  @JoinColumn({ name: 'prescriptionId' })
  prescription: Prescription;

  @ManyToOne(() => Medicine, (medicine) => medicine.prescriptionMedicines)
  @JoinColumn({ name: 'medicineId' })
  medicine: Medicine;
}

