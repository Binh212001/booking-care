import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertPrescription1763801809414 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Get existing patients
    const patients = await queryRunner.query(
      `SELECT id, email FROM patients ORDER BY "createdAt" ASC`,
    );

    // Get existing doctors
    const doctors = await queryRunner.query(
      `SELECT id, email FROM doctors ORDER BY "createdAt" ASC`,
    );

    // Get existing medicines
    const medicines = await queryRunner.query(
      `SELECT id, code FROM medicines ORDER BY code ASC`,
    );

    if (
      patients.length === 0 ||
      doctors.length === 0 ||
      medicines.length === 0
    ) {
      console.log(
        'No patients, doctors, or medicines found. Skipping prescription migration.',
      );
      return;
    }

    // Create prescriptions
    const prescriptions = [
      {
        patientId: patients[0].id,
        doctorId: doctors[0].id,
        appointmentId: null,
        prescriptionNumber: 'DT001',
        diagnosis: 'Viêm kết mạc cấp tính',
        notes:
          'Bệnh nhân cần nhỏ thuốc đúng giờ, tránh dụi mắt. Tái khám sau 7 ngày.',
        status: 'filled',
        filledAt: new Date('2024-01-15T10:00:00Z'),
      },
      {
        patientId: patients[0].id,
        doctorId: doctors[0].id,
        appointmentId: null,
        prescriptionNumber: 'DT002',
        diagnosis: 'Khô mắt, viêm kết mạc dị ứng',
        notes:
          'Sử dụng thuốc nhỏ mắt thường xuyên, tránh tiếp xúc với khói bụi.',
        status: 'filled',
        filledAt: new Date('2024-01-20T14:30:00Z'),
      },
      {
        patientId: patients[1].id,
        doctorId: doctors[1].id,
        appointmentId: null,
        prescriptionNumber: 'DT003',
        diagnosis: 'Viêm bờ mi, viêm kết mạc',
        notes:
          'Bôi thuốc mỡ vào buổi tối trước khi ngủ. Kết hợp uống thuốc giảm đau nếu cần.',
        status: 'filled',
        filledAt: new Date('2024-01-18T09:15:00Z'),
      },
      {
        patientId: patients[1].id,
        doctorId: doctors[0].id,
        appointmentId: null,
        prescriptionNumber: 'DT004',
        diagnosis: 'Viêm kết mạc do vi khuẩn',
        notes:
          'Nhỏ thuốc đều đặn, không bỏ liều. Nếu triệu chứng không cải thiện sau 3 ngày, tái khám ngay.',
        status: 'pending',
        filledAt: null,
      },
    ];

    const insertedPrescriptions = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('prescriptions')
      .values(prescriptions)
      .returning(['id', 'prescriptionNumber'])
      .execute();

    const insertedPrescriptionsMap = insertedPrescriptions.generatedMaps;

    // Create prescription medicines
    // Prescription DT001: Tobramycin + Paracetamol
    const prescriptionMedicines = [
      {
        prescriptionId: insertedPrescriptionsMap[0].id,
        medicineId: medicines.find((m) => m.code === 'MED001')?.id,
        quantity: 2,
        dosage: '1-2 giọt',
        frequency: '3-4 lần/ngày',
        duration: '7 ngày',
        notes: 'Nhỏ vào mắt bị bệnh, rửa tay trước khi nhỏ',
      },
      {
        prescriptionId: insertedPrescriptionsMap[0].id,
        medicineId: medicines.find((m) => m.code === 'MED004')?.id,
        quantity: 10,
        dosage: '1-2 viên',
        frequency: '3-4 lần/ngày',
        duration: '3 ngày',
        notes: 'Uống sau bữa ăn, chỉ dùng khi đau',
      },
      // Prescription DT002: Cyclosporine
      {
        prescriptionId: insertedPrescriptionsMap[1].id,
        medicineId: medicines.find((m) => m.code === 'MED002')?.id,
        quantity: 1,
        dosage: '1 giọt',
        frequency: '2 lần/ngày',
        duration: '14 ngày',
        notes: 'Nhỏ vào mỗi mắt, cách nhau 12 giờ',
      },
      // Prescription DT003: Erythromycin + Paracetamol
      {
        prescriptionId: insertedPrescriptionsMap[2].id,
        medicineId: medicines.find((m) => m.code === 'MED003')?.id,
        quantity: 1,
        dosage: 'Một lượng nhỏ',
        frequency: '2-3 lần/ngày',
        duration: '10 ngày',
        notes: 'Bôi vào bờ mi hoặc trong túi kết mạc, tránh để thuốc vào mắt',
      },
      {
        prescriptionId: insertedPrescriptionsMap[2].id,
        medicineId: medicines.find((m) => m.code === 'MED004')?.id,
        quantity: 20,
        dosage: '1-2 viên',
        frequency: '3 lần/ngày',
        duration: '5 ngày',
        notes: 'Uống sau bữa ăn',
      },
      // Prescription DT004: Tobramycin
      {
        prescriptionId: insertedPrescriptionsMap[3].id,
        medicineId: medicines.find((m) => m.code === 'MED001')?.id,
        quantity: 1,
        dosage: '1-2 giọt',
        frequency: '4 lần/ngày',
        duration: '7 ngày',
        notes: 'Nhỏ vào mắt bị bệnh',
      },
    ];

    // Filter out any prescription medicines with missing medicine IDs
    const validPrescriptionMedicines = prescriptionMedicines.filter(
      (pm) => pm.medicineId !== undefined,
    );

    if (validPrescriptionMedicines.length > 0) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('prescription_medicines')
        .values(validPrescriptionMedicines)
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Delete prescription medicines first (due to foreign key constraints)
    await queryRunner.query(`DELETE FROM prescription_medicines`);
    // Delete prescriptions
    await queryRunner.query(`DELETE FROM prescriptions`);
  }
}
