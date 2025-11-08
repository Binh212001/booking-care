import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class InsertMockData1763801028635 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Insert Users
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = [
      {
        username: 'admin',
        email: 'admin@bookingcare.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true,
      },
      {
        username: 'doctor1',
        email: 'doctor1@bookingcare.com',
        password: hashedPassword,
        role: 'doctor',
        isActive: true,
      },
      {
        username: 'doctor2',
        email: 'doctor2@bookingcare.com',
        password: hashedPassword,
        role: 'doctor',
        isActive: true,
      },
      {
        username: 'patient1',
        email: 'patient1@bookingcare.com',
        password: hashedPassword,
        role: 'patient',
        isActive: true,
      },
      {
        username: 'patient2',
        email: 'patient2@bookingcare.com',
        password: hashedPassword,
        role: 'patient',
        isActive: true,
      },
    ];

    const insertedUsers = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values(users)
      .returning(['id', 'username', 'role'])
      .execute();

    // Get inserted user ids
    const insertedUsersMap = insertedUsers.generatedMaps;

    // 2. Insert Departments
    const departments = [
      {
        name: 'Khoa Mắt',
        code: 'EYE',
        description: 'Khoa chuyên về điều trị các bệnh lý về mắt',
        isActive: true,
      },
      {
        name: 'Khoa Khám Tổng Quát',
        code: 'GEN',
        description: 'Khoa khám tổng quát và tư vấn sức khỏe',
        isActive: true,
      },
      {
        name: 'Khoa Phẫu Thuật',
        code: 'SUR',
        description: 'Khoa chuyên về phẫu thuật mắt',
        isActive: true,
      },
    ];

    const insertedDepartments = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('departments')
      .values(departments)
      .returning(['id', 'code'])
      .execute();

    const insertedDepartmentsMap = insertedDepartments.generatedMaps;

    // 3. Insert Doctors
    const doctors = [
      {
        code: 'DOC001',
        fullName: 'Bác sĩ Nguyễn Văn A',
        phone: '0912345678',
        email: 'doctor1@bookingcare.com',
        licenseNumber: 'BS001',
        specialization: 'Chuyên khoa Mắt',
        degree: 'Tiến sĩ',
        experience: '15 năm kinh nghiệm trong lĩnh vực nhãn khoa',
        gender: 'male',
        dateOfBirth: '1980-05-15',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        isActive: true,
        departmentId:
          insertedDepartmentsMap[0] && insertedDepartmentsMap[0].id
            ? insertedDepartmentsMap[0].id
            : null, // fix null-safe checks for id
        userId:
          insertedUsersMap[1] && insertedUsersMap[1].id
            ? insertedUsersMap[1].id
            : null,
      },
      {
        code: 'DOC002',
        fullName: 'Bác sĩ Trần Thị B',
        phone: '0912345679',
        email: 'doctor2@bookingcare.com',
        licenseNumber: 'BS002',
        specialization: 'Phẫu thuật Mắt',
        degree: 'Thạc sĩ',
        experience: '10 năm kinh nghiệm phẫu thuật mắt',
        gender: 'female',
        dateOfBirth: '1985-08-20',
        address: '456 Đường XYZ, Quận 2, TP.HCM',
        isActive: true,
        departmentId:
          insertedDepartmentsMap[2] && insertedDepartmentsMap[2].id
            ? insertedDepartmentsMap[2].id
            : null,
        userId:
          insertedUsersMap[2] && insertedUsersMap[2].id
            ? insertedUsersMap[2].id
            : null,
      },
    ];

    const insertedDoctors = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('doctors')
      .values(doctors)
      .returning(['id', 'userId'])
      .execute();

    // 4. Insert Patients
    const patients = [
      {
        fullName: 'Nguyễn Văn Bệnh Nhân 1',
        phone: '0987654321',
        email: 'patient1@bookingcare.com',
        gender: 'male',
        dateOfBirth: '1990-01-10',
        identityCard: '123456789012',
        address: '789 Đường DEF, Quận 3, TP.HCM',
        bloodType: 'A+',
        medicalHistory: 'Không có tiền sử bệnh lý',
        allergy: 'Không dị ứng',
        eyeHistory: 'Cận thị từ nhỏ',
        wearsGlasses: true,
        wearsContactLens: false,
        rightEyePower: '-2.5D',
        leftEyePower: '-2.0D',
        emergencyContact: 'Nguyễn Văn Người Thân',
        emergencyPhone: '0987654322',
        userId:
          insertedUsersMap[3] && insertedUsersMap[3].id
            ? insertedUsersMap[3].id
            : null,
      },
      {
        fullName: 'Trần Thị Bệnh Nhân 2',
        phone: '0987654323',
        email: 'patient2@bookingcare.com',
        gender: 'female',
        dateOfBirth: '1995-03-25',
        identityCard: '987654321098',
        address: '321 Đường GHI, Quận 4, TP.HCM',
        bloodType: 'O+',
        medicalHistory: 'Tiểu đường type 2',
        allergy: 'Dị ứng với penicillin',
        eyeHistory: 'Viễn thị, đục thủy tinh thể',
        wearsGlasses: true,
        wearsContactLens: false,
        rightEyePower: '+1.5D',
        leftEyePower: '+1.75D',
        emergencyContact: 'Trần Văn Người Thân',
        emergencyPhone: '0987654324',
        userId:
          insertedUsersMap[4] && insertedUsersMap[4].id
            ? insertedUsersMap[4].id
            : null,
      },
    ];

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('patients')
      .values(patients)
      .execute();

    // 5. Insert Medicines
    const medicines = [
      {
        name: 'Thuốc nhỏ mắt Tobramycin',
        code: 'MED001',
        activeIngredient: 'Tobramycin 0.3%',
        dosage: '0.3%',
        unit: 'ml',
        form: 'eye_drops',
        isEyeMedication: true,
        manufacturer: 'Công ty Dược phẩm ABC',
        country: 'Việt Nam',
        price: 45000,
        indication: 'Điều trị viêm kết mạc, viêm giác mạc do vi khuẩn',
        contraindication: 'Quá mẫn với Tobramycin',
        sideEffects: 'Kích ứng nhẹ, đỏ mắt',
        usage: 'Nhỏ 1-2 giọt vào mắt bị bệnh, 3-4 lần/ngày',
        stock: 100,
        isActive: true,
      },
      {
        name: 'Thuốc nhỏ mắt Cyclosporine',
        code: 'MED002',
        activeIngredient: 'Cyclosporine 0.05%',
        dosage: '0.05%',
        unit: 'ml',
        form: 'eye_drops',
        isEyeMedication: true,
        manufacturer: 'Công ty Dược phẩm XYZ',
        country: 'Việt Nam',
        price: 120000,
        indication: 'Điều trị khô mắt, viêm kết mạc dị ứng',
        contraindication: 'Quá mẫn với Cyclosporine',
        sideEffects: 'Nóng rát, chảy nước mắt',
        usage: 'Nhỏ 1 giọt vào mỗi mắt, 2 lần/ngày',
        stock: 50,
        isActive: true,
      },
      {
        name: 'Thuốc mỡ mắt Erythromycin',
        code: 'MED003',
        activeIngredient: 'Erythromycin 0.5%',
        dosage: '0.5%',
        unit: 'g',
        form: 'ointment',
        isEyeMedication: true,
        manufacturer: 'Công ty Dược phẩm DEF',
        country: 'Việt Nam',
        price: 35000,
        indication: 'Điều trị viêm bờ mi, viêm kết mạc',
        contraindication: 'Quá mẫn với Erythromycin',
        sideEffects: 'Nhìn mờ tạm thời',
        usage: 'Bôi vào bờ mi hoặc trong túi kết mạc, 2-3 lần/ngày',
        stock: 75,
        isActive: true,
      },
      {
        name: 'Paracetamol 500mg',
        code: 'MED004',
        activeIngredient: 'Paracetamol',
        dosage: '500mg',
        unit: 'viên',
        form: 'tablet',
        isEyeMedication: false,
        manufacturer: 'Công ty Dược phẩm GHI',
        country: 'Việt Nam',
        price: 5000,
        indication: 'Giảm đau, hạ sốt',
        contraindication: 'Suy gan nặng',
        sideEffects: 'Hiếm khi xảy ra',
        usage: 'Uống 1-2 viên, 3-4 lần/ngày',
        stock: 500,
        isActive: true,
      },
    ];

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('medicines')
      .values(medicines)
      .execute();

    // 6. Insert Services
    const services = [
      {
        name: 'Khám tổng quát mắt',
        code: 'SVC001',
        description:
          'Khám tổng quát mắt bao gồm đo thị lực, khám khe đèn, khám đáy mắt',
        price: 200000,
        unit: 'lần',
        duration: 30,
        type: 'examination',
        eyeServiceType: 'general_eye_exam',
        isActive: true,
      },
      {
        name: 'Đo khúc xạ',
        code: 'SVC002',
        description: 'Đo độ cận, viễn, loạn thị',
        price: 150000,
        unit: 'lần',
        duration: 20,
        type: 'examination',
        eyeServiceType: 'refraction',
        isActive: true,
      },
      {
        name: 'Khám khe đèn',
        code: 'SVC003',
        description: 'Khám chi tiết các cấu trúc mắt bằng khe đèn',
        price: 100000,
        unit: 'lần',
        duration: 15,
        type: 'examination',
        eyeServiceType: 'slit_lamp',
        isActive: true,
      },
      {
        name: 'Khám đáy mắt',
        code: 'SVC004',
        description: 'Khám võng mạc, đáy mắt',
        price: 180000,
        unit: 'lần',
        duration: 20,
        type: 'examination',
        eyeServiceType: 'fundus_exam',
        isActive: true,
      },
      {
        name: 'Đo nhãn áp',
        code: 'SVC005',
        description: 'Đo áp lực trong mắt để phát hiện glocom',
        price: 80000,
        unit: 'lần',
        duration: 10,
        type: 'test',
        eyeServiceType: 'tonometry',
        isActive: true,
      },
      {
        name: 'Phẫu thuật đục thủy tinh thể',
        code: 'SVC006',
        description: 'Phẫu thuật thay thủy tinh thể bị đục',
        price: 15000000,
        unit: 'mắt',
        duration: 60,
        type: 'surgery',
        eyeServiceType: 'cataract_surgery',
        isActive: true,
      },
      {
        name: 'Phẫu thuật LASIK',
        code: 'SVC007',
        description: 'Phẫu thuật điều trị cận thị bằng laser',
        price: 20000000,
        unit: '2 mắt',
        duration: 30,
        type: 'surgery',
        eyeServiceType: 'lasik',
        isActive: true,
      },
    ];

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('services')
      .values(services)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Fix order to comply with foreign key constraints: delete dependent tables first
    // Delete services
    await queryRunner.query(`DELETE FROM services`);
    // Delete medicines
    await queryRunner.query(`DELETE FROM medicines`);
    // Delete patients
    await queryRunner.query(`DELETE FROM patients`);
    // Delete doctors
    await queryRunner.query(`DELETE FROM doctors`);
    // Delete departments
    await queryRunner.query(`DELETE FROM departments`);
    // Delete users
    await queryRunner.query(`DELETE FROM users`);
  }
}
