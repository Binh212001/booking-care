import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertMedicalRecord1763802616034 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Get existing patients
    const patients = await queryRunner.query(
      `SELECT id, email FROM patients ORDER BY "createdAt" ASC`,
    );

    // Get existing doctors
    const doctors = await queryRunner.query(
      `SELECT id, email FROM doctors ORDER BY "createdAt" ASC`,
    );

    if (patients.length === 0 || doctors.length === 0) {
      console.log(
        'No patients or doctors found. Skipping medical record migration.',
      );
      return;
    }

    // Create medical records
    const medicalRecords = [
      {
        patientId: patients[0]?.id,
        doctorId: doctors[0]?.id,
        appointmentId: null,
        chiefComplaint: 'Đau mắt, đỏ mắt, chảy nước mắt 3 ngày nay',
        presentIllness:
          'Bệnh nhân bắt đầu có triệu chứng đau mắt, đỏ mắt và chảy nước mắt từ 3 ngày trước. Triệu chứng ngày càng nặng hơn, đặc biệt vào buổi sáng khi thức dậy có nhiều ghèn mắt.',
        examination:
          'Mắt phải: Kết mạc đỏ, phù nề, có dịch tiết. Mắt trái: Bình thường. Không có dấu hiệu tổn thương giác mạc.',
        rightEyeVisualAcuity: '20/40',
        leftEyeVisualAcuity: '20/20',
        rightEyeVisualAcuityCorrected: '20/20',
        leftEyeVisualAcuityCorrected: '20/20',
        rightEyePressure: 15.5,
        leftEyePressure: 16.0,
        rightEyeRefraction: '-2.5/-0.5x180',
        leftEyeRefraction: '-2.0/-0.25x90',
        rightEyeFundus: 'Đáy mắt bình thường, không có tổn thương võng mạc',
        leftEyeFundus: 'Đáy mắt bình thường',
        eyeExamination:
          'Giác mạc trong, mống mắt bình thường, đồng tử phản xạ tốt. Kết mạc mắt phải viêm, có dịch tiết.',
        diagnosis: 'Viêm kết mạc cấp tính mắt phải',
        treatmentPlan:
          'Nhỏ thuốc kháng sinh Tobramycin 0.3%, 3-4 lần/ngày trong 7 ngày. Tái khám sau 1 tuần.',
        notes:
          'Bệnh nhân cần vệ sinh mắt đúng cách, tránh dụi mắt. Nghỉ ngơi, tránh tiếp xúc với khói bụi.',
        recordNumber: 'HS001',
        status: 'completed',
      },
      {
        patientId: patients[0]?.id,
        doctorId: doctors[0]?.id,
        appointmentId: null,
        chiefComplaint: 'Khô mắt, cảm giác cộm xốn, nhức mắt',
        presentIllness:
          'Bệnh nhân có triệu chứng khô mắt, cảm giác cộm xốn và nhức mắt kéo dài 2 tuần. Triệu chứng nặng hơn khi làm việc với máy tính hoặc đọc sách lâu.',
        examination:
          'Cả hai mắt: Kết mạc hơi đỏ, có dấu hiệu khô mắt. Test Schirmer giảm. Không có tổn thương giác mạc.',
        rightEyeVisualAcuity: '20/30',
        leftEyeVisualAcuity: '20/30',
        rightEyeVisualAcuityCorrected: '20/20',
        leftEyeVisualAcuityCorrected: '20/20',
        rightEyePressure: 16.0,
        leftEyePressure: 15.8,
        rightEyeRefraction: '-2.5/-0.5x180',
        leftEyeRefraction: '-2.0/-0.25x90',
        rightEyeFundus: 'Đáy mắt bình thường',
        leftEyeFundus: 'Đáy mắt bình thường',
        eyeExamination:
          'Giác mạc trong, mống mắt bình thường. Kết mạc có dấu hiệu khô, thiếu nước mắt.',
        diagnosis: 'Khô mắt, viêm kết mạc dị ứng',
        treatmentPlan:
          'Nhỏ thuốc Cyclosporine 0.05% vào mỗi mắt, 2 lần/ngày trong 14 ngày. Sử dụng nước mắt nhân tạo khi cần.',
        notes:
          'Bệnh nhân cần tránh tiếp xúc với khói bụi, sử dụng kính bảo vệ mắt. Nghỉ ngơi mắt thường xuyên khi làm việc với máy tính.',
        recordNumber: 'HS002',
        status: 'in_progress',
      },
      {
        patientId: patients[1]?.id || patients[0]?.id,
        doctorId: doctors[1]?.id || doctors[0]?.id,
        appointmentId: null,
        chiefComplaint: 'Viêm bờ mi, đỏ mắt, ngứa mắt',
        presentIllness:
          'Bệnh nhân có triệu chứng viêm bờ mi, đỏ mắt và ngứa mắt từ 1 tuần trước. Bờ mi có vảy, đóng cứng vào buổi sáng.',
        examination:
          'Cả hai mắt: Bờ mi đỏ, có vảy, phù nề nhẹ. Kết mạc đỏ, có dịch tiết nhẹ. Không có tổn thương giác mạc.',
        rightEyeVisualAcuity: '20/25',
        leftEyeVisualAcuity: '20/25',
        rightEyeVisualAcuityCorrected: '20/20',
        leftEyeVisualAcuityCorrected: '20/20',
        rightEyePressure: 15.2,
        leftEyePressure: 15.5,
        rightEyeRefraction: '+1.5/-0.25x90',
        leftEyeRefraction: '+1.75/-0.25x90',
        rightEyeFundus: 'Đáy mắt bình thường',
        leftEyeFundus: 'Đáy mắt bình thường',
        eyeExamination:
          'Giác mạc trong, mống mắt bình thường. Bờ mi viêm, có vảy và phù nề.',
        diagnosis: 'Viêm bờ mi, viêm kết mạc',
        treatmentPlan:
          'Bôi thuốc mỡ Erythromycin 0.5% vào bờ mi, 2-3 lần/ngày trong 10 ngày. Vệ sinh mắt đúng cách.',
        notes:
          'Bệnh nhân cần vệ sinh mắt đúng cách, chườm ấm bờ mi. Kết hợp uống thuốc giảm đau Paracetamol khi cần.',
        recordNumber: 'HS003',
        status: 'completed',
      },
      {
        patientId: patients[1]?.id || patients[0]?.id,
        doctorId: doctors[0]?.id,
        appointmentId: null,
        chiefComplaint: 'Đau mắt, đỏ mắt, có mủ',
        presentIllness:
          'Bệnh nhân có triệu chứng đau mắt, đỏ mắt và có mủ từ 2 ngày trước. Triệu chứng nặng hơn, đặc biệt là có nhiều mủ vào buổi sáng.',
        examination:
          'Mắt trái: Kết mạc đỏ nhiều, phù nề, có nhiều dịch tiết mủ. Mắt phải: Bình thường. Có dấu hiệu viêm nhiễm nặng.',
        rightEyeVisualAcuity: '20/20',
        leftEyeVisualAcuity: '20/50',
        rightEyeVisualAcuityCorrected: '20/20',
        leftEyeVisualAcuityCorrected: '20/20',
        rightEyePressure: 15.8,
        leftEyePressure: 16.2,
        rightEyeRefraction: '+1.5/-0.25x90',
        leftEyeRefraction: '+1.75/-0.25x90',
        rightEyeFundus: 'Đáy mắt bình thường',
        leftEyeFundus: 'Đáy mắt bình thường, khó khám do viêm nhiễm',
        eyeExamination:
          'Giác mạc trong, mống mắt bình thường. Kết mạc mắt trái viêm nặng, có nhiều mủ.',
        diagnosis: 'Viêm kết mạc do vi khuẩn mắt trái',
        treatmentPlan:
          'Nhỏ thuốc Tobramycin 0.3% vào mắt bị bệnh, 4 lần/ngày trong 7 ngày. Nếu không cải thiện sau 3 ngày, tái khám ngay.',
        notes:
          'Bệnh nhân cần nhỏ thuốc đều đặn, không bỏ liều. Vệ sinh mắt đúng cách, tránh lây nhiễm sang mắt còn lại.',
        recordNumber: 'HS004',
        status: 'in_progress',
      },
    ];

    // Filter out any medical records with missing required IDs
    const validMedicalRecords = medicalRecords.filter(
      (mr) => mr.patientId && mr.doctorId,
    );

    if (validMedicalRecords.length === 0) {
      console.log('No valid medical records to insert.');
      return;
    }

    // Insert medical records using parameterized queries
    let insertedCount = 0;
    for (const record of validMedicalRecords) {
      try {
        await queryRunner.query(
          `INSERT INTO medical_records (
            "patientId",
            "doctorId",
            "appointmentId",
            "chiefComplaint",
            "presentIllness",
            examination,
            "rightEyeVisualAcuity",
            "leftEyeVisualAcuity",
            "rightEyeVisualAcuityCorrected",
            "leftEyeVisualAcuityCorrected",
            "rightEyePressure",
            "leftEyePressure",
            "rightEyeRefraction",
            "leftEyeRefraction",
            "rightEyeFundus",
            "leftEyeFundus",
            "eyeExamination",
            diagnosis,
            "treatmentPlan",
            notes,
            "recordNumber",
            status,
            "createdAt",
            "updatedAt"
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, NOW(), NOW()
          )`,
          [
            record.patientId,
            record.doctorId,
            record.appointmentId || null,
            record.chiefComplaint || null,
            record.presentIllness || null,
            record.examination || null,
            record.rightEyeVisualAcuity || null,
            record.leftEyeVisualAcuity || null,
            record.rightEyeVisualAcuityCorrected || null,
            record.leftEyeVisualAcuityCorrected || null,
            record.rightEyePressure || null,
            record.leftEyePressure || null,
            record.rightEyeRefraction || null,
            record.leftEyeRefraction || null,
            record.rightEyeFundus || null,
            record.leftEyeFundus || null,
            record.eyeExamination || null,
            record.diagnosis || null,
            record.treatmentPlan || null,
            record.notes || null,
            record.recordNumber || null,
            record.status || 'new',
          ],
        );
        insertedCount++;
      } catch (error) {
        console.error(
          `Error inserting medical record "${record.recordNumber}":`,
          error.message,
        );
        throw error;
      }
    }

    console.log(`Successfully inserted ${insertedCount} medical records.`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Delete medical records
    await queryRunner.query(`DELETE FROM medical_records`);
  }
}

