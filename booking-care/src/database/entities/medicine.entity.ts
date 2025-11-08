import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { PrescriptionMedicine } from './prescription-medicine.entity';

@Entity('medicines')
export class Medicine extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string; // Tên thuốc

  @Column({ type: 'varchar', length: 50, nullable: true })
  code: string; // Mã thuốc

  @Column({ type: 'varchar', length: 100, nullable: true })
  activeIngredient: string; // Hoạt chất

  @Column({ type: 'varchar', length: 50, nullable: true })
  dosage: string; // Liều lượng

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit: string; // Đơn vị

  @Column({
    type: 'enum',
    enum: ['tablet', 'capsule', 'eye_drops', 'ointment', 'injection', 'other'],
    nullable: true,
  })
  form: string; // Dạng thuốc (viên nén, viên nang, thuốc nhỏ mắt, thuốc mỡ, tiêm, khác)

  @Column({ type: 'boolean', default: false })
  isEyeMedication: boolean; // Là thuốc mắt (thuốc nhỏ mắt, thuốc mỡ mắt, v.v.)

  @Column({ type: 'varchar', length: 100, nullable: true })
  manufacturer: string; // Nhà sản xuất

  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string; // Nước sản xuất

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  price: number; // Giá thuốc

  @Column({ type: 'text', nullable: true })
  indication: string; // Chỉ định

  @Column({ type: 'text', nullable: true })
  contraindication: string; // Chống chỉ định

  @Column({ type: 'text', nullable: true })
  sideEffects: string; // Tác dụng phụ

  @Column({ type: 'text', nullable: true })
  usage: string; // Cách dùng

  @Column({ type: 'int', nullable: true })
  stock: number; // Tồn kho

  @Column({ type: 'boolean', default: true })
  isActive: boolean; // Trạng thái hoạt động

  @OneToMany(
    () => PrescriptionMedicine,
    (prescriptionMedicine) => prescriptionMedicine.medicine,
  )
  prescriptionMedicines: PrescriptionMedicine[];
}
