import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTreatment1763802700000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Get existing medical records
    const medicalRecords = await queryRunner.query(
      `SELECT id, "patientId", "doctorId", diagnosis FROM medical_records ORDER BY "createdAt" ASC`,
    );

    // Get existing doctors
    const doctors = await queryRunner.query(
      `SELECT id, email FROM doctors ORDER BY "createdAt" ASC`,
    );

    if (medicalRecords.length === 0 || doctors.length === 0) {
      console.log(
        'No medical records or doctors found. Skipping treatment migration.',
      );
      return;
    }

    // Create treatments
    const treatments = [
      {
        medicalRecordId: medicalRecords[0]?.id,
        doctorId: medicalRecords[0]?.doctorId || doctors[0]?.id,
        name: 'Điều trị viêm kết mạc bằng thuốc nhỏ mắt',
        description:
          'Nhỏ thuốc kháng sinh Tobramycin 0.3% vào mắt bị bệnh, 3-4 lần/ngày trong 7 ngày',
        startDate: new Date('2024-01-15T10:00:00Z'),
        endDate: new Date('2024-01-22T10:00:00Z'),
        status: 'completed',
        treatmentType: 'eye_drops',
        result:
          'Bệnh nhân đã khỏi bệnh, không còn triệu chứng đỏ mắt, chảy nước mắt',
        notes:
          'Bệnh nhân tuân thủ tốt phác đồ điều trị. Tái khám sau 1 tuần để kiểm tra.',
      },
      {
        medicalRecordId: medicalRecords[0]?.id,
        doctorId: medicalRecords[0]?.doctorId || doctors[0]?.id,
        name: 'Điều trị khô mắt bằng thuốc nhỏ mắt Cyclosporine',
        description:
          'Nhỏ thuốc Cyclosporine 0.05% vào mỗi mắt, 2 lần/ngày trong 14 ngày',
        startDate: new Date('2024-01-20T14:30:00Z'),
        endDate: new Date('2024-02-03T14:30:00Z'),
        status: 'in_progress',
        treatmentType: 'eye_drops',
        result: null,
        notes:
          'Bệnh nhân đang trong quá trình điều trị. Cần tránh tiếp xúc với khói bụi, sử dụng kính bảo vệ mắt.',
      },
      {
        medicalRecordId: medicalRecords[1]?.id || medicalRecords[0]?.id,
        doctorId:
          medicalRecords[1]?.doctorId ||
          medicalRecords[0]?.doctorId ||
          doctors[1]?.id ||
          doctors[0]?.id,
        name: 'Điều trị viêm bờ mi bằng thuốc mỡ',
        description:
          'Bôi thuốc mỡ Erythromycin 0.5% vào bờ mi, 2-3 lần/ngày trong 10 ngày',
        startDate: new Date('2024-01-18T09:15:00Z'),
        endDate: new Date('2024-01-28T09:15:00Z'),
        status: 'completed',
        treatmentType: 'medication',
        result:
          'Viêm bờ mi đã giảm đáng kể, bệnh nhân không còn cảm giác khó chịu',
        notes:
          'Kết hợp uống thuốc giảm đau Paracetamol khi cần. Bệnh nhân cần vệ sinh mắt đúng cách.',
      },
      {
        medicalRecordId: medicalRecords[1]?.id || medicalRecords[0]?.id,
        doctorId:
          medicalRecords[1]?.doctorId ||
          medicalRecords[0]?.doctorId ||
          doctors[0]?.id,
        name: 'Điều trị viêm kết mạc do vi khuẩn',
        description:
          'Nhỏ thuốc Tobramycin 0.3% vào mắt bị bệnh, 4 lần/ngày trong 7 ngày',
        startDate: new Date('2024-01-25T08:00:00Z'),
        endDate: null,
        status: 'in_progress',
        treatmentType: 'eye_drops',
        result: null,
        notes:
          'Bệnh nhân cần nhỏ thuốc đều đặn, không bỏ liều. Nếu triệu chứng không cải thiện sau 3 ngày, tái khám ngay.',
      },
      {
        medicalRecordId: medicalRecords[0]?.id,
        doctorId: medicalRecords[0]?.doctorId || doctors[0]?.id,
        name: 'Tái khám sau điều trị',
        description:
          'Tái khám để kiểm tra kết quả điều trị và đánh giá tình trạng mắt',
        startDate: new Date('2024-01-29T10:00:00Z'),
        endDate: null,
        status: 'planned',
        treatmentType: 'follow_up',
        result: null,
        notes:
          'Bệnh nhân cần tái khám sau 1 tuần kể từ khi kết thúc điều trị để đánh giá kết quả.',
      },
    ];

    // Filter out any treatments with missing required IDs
    const validTreatments = treatments.filter(
      (t) => t.medicalRecordId && t.doctorId,
    );

    if (validTreatments.length === 0) {
      console.log('No valid treatments to insert.');
      return;
    }

    // Insert treatments using raw SQL to ensure proper date handling
    let insertedCount = 0;
    for (const treatment of validTreatments) {
      try {
        const startDate = treatment.startDate.toISOString();
        const endDate = treatment.endDate
          ? `'${treatment.endDate.toISOString()}'`
          : 'NULL';
        const result = treatment.result
          ? `'${treatment.result.replace(/'/g, "''")}'`
          : 'NULL';
        const notes = treatment.notes
          ? `'${treatment.notes.replace(/'/g, "''")}'`
          : 'NULL';
        const description = treatment.description
          ? `'${treatment.description.replace(/'/g, "''")}'`
          : 'NULL';
        const name = treatment.name.replace(/'/g, "''");

        await queryRunner.query(
          `INSERT INTO treatments (
            "medicalRecordId", 
            "doctorId", 
            name, 
            description, 
            "startDate", 
            "endDate", 
            status, 
            "treatmentType", 
            result, 
            notes,
            "createdAt",
            "updatedAt"
          ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            NOW(),
            NOW()
          )`,
          [
            treatment.medicalRecordId,
            treatment.doctorId,
            name,
            treatment.description || null,
            startDate,
            treatment.endDate ? treatment.endDate.toISOString() : null,
            treatment.status,
            treatment.treatmentType || null,
            treatment.result || null,
            treatment.notes || null,
          ],
        );
        insertedCount++;
      } catch (error) {
        console.error(
          `Error inserting treatment "${treatment.name}":`,
          error.message,
        );
        throw error;
      }
    }

    console.log(`Successfully inserted ${insertedCount} treatments.`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Delete treatments
    await queryRunner.query(`DELETE FROM treatments`);
  }
}

