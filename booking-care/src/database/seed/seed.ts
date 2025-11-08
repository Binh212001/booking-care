import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import {
  User,
  Department,
  Doctor,
  Patient,
  Medicine,
  Service,
  Appointment,
  Prescription,
  PrescriptionMedicine,
  MedicalRecord,
  Treatment,
} from '../entities';

async function seed() {
  const configService = new ConfigService();

  const dbHost = configService.get<string>('DB_HOST') || 'localhost';
  const dbPort = configService.get<number>('DB_PORT') || 25432;
  const dbUser = configService.get<string>('DB_USER') || 'root';
  const dbPass = configService.get<string>('DB_PASS') || 'root';
  const dbName = configService.get<string>('DB_NAME') || 'booking-care';

  const dataSource = new DataSource({
    type: 'postgres',
    host: dbHost,
    port: dbPort,
    username: dbUser,
    password: dbPass,
    database: dbName,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
  });

  let isInitialized = false;
  try {
    await dataSource.initialize();
    isInitialized = true;
    console.log('✅ Database connected');

    const userRepository = dataSource.getRepository(User);
    const departmentRepository = dataSource.getRepository(Department);
    const doctorRepository = dataSource.getRepository(Doctor);
    const patientRepository = dataSource.getRepository(Patient);
    const medicineRepository = dataSource.getRepository(Medicine);
    const serviceRepository = dataSource.getRepository(Service);
    const appointmentRepository = dataSource.getRepository(Appointment);
    const prescriptionRepository = dataSource.getRepository(Prescription);
    const prescriptionMedicineRepository =
      dataSource.getRepository(PrescriptionMedicine);
    const medicalRecordRepository = dataSource.getRepository(MedicalRecord);
    const treatmentRepository = dataSource.getRepository(Treatment);

    // Clear existing data (optional - comment out if you want to keep existing data)
    // Use raw SQL with CASCADE to handle foreign key constraints
    console.log('🗑️  Clearing existing data...');
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.query(
      'TRUNCATE TABLE prescription_medicines, treatments, medical_records, prescriptions, appointments, rooms, services, medicines, doctors, patients, departments, users CASCADE',
    );
    await queryRunner.release();

    // 1. Seed Users
    console.log('👤 Seeding users...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    const adminUser = userRepository.create({
      username: 'admin',
      email: 'admin@bookingcare.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });

    const doctorUser1 = userRepository.create({
      username: 'doctor1',
      email: 'doctor1@bookingcare.com',
      password: hashedPassword,
      role: 'doctor',
      isActive: true,
    });

    const doctorUser2 = userRepository.create({
      username: 'doctor2',
      email: 'doctor2@bookingcare.com',
      password: hashedPassword,
      role: 'doctor',
      isActive: true,
    });

    const patientUser1 = userRepository.create({
      username: 'patient1',
      email: 'patient1@bookingcare.com',
      password: hashedPassword,
      role: 'patient',
      isActive: true,
    });

    const patientUser2 = userRepository.create({
      username: 'patient2',
      email: 'patient2@bookingcare.com',
      password: hashedPassword,
      role: 'patient',
      isActive: true,
    });

    const savedUsers = await userRepository.save([
      adminUser,
      doctorUser1,
      doctorUser2,
      patientUser1,
      patientUser2,
    ]);
    console.log(`✅ Created ${savedUsers.length} users`);

    // 2. Seed Departments
    console.log('🏥 Seeding departments...');
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

    const savedDepartments = await departmentRepository.save(departments);
    console.log(`✅ Created ${savedDepartments.length} departments`);

    // 3. Seed Doctors
    console.log('👨‍⚕️ Seeding doctors...');
    const doctors = [
      {
        fullName: 'Bác sĩ Nguyễn Văn A',
        phone: '0912345678',
        email: 'doctor1@bookingcare.com',
        licenseNumber: 'BS001',
        specialization: 'Chuyên khoa Mắt',
        degree: 'Tiến sĩ',
        experience: '15 năm kinh nghiệm trong lĩnh vực nhãn khoa',
        gender: 'male',
        dateOfBirth: new Date('1980-05-15'),
        address: '123 Đường ABC, Quận 1, TP.HCM',
        isActive: true,
        departmentId: savedDepartments[0].id,
        userId: savedUsers[1].id, // doctorUser1
      },
      {
        fullName: 'Bác sĩ Trần Thị B',
        phone: '0912345679',
        email: 'doctor2@bookingcare.com',
        licenseNumber: 'BS002',
        specialization: 'Phẫu thuật Mắt',
        degree: 'Thạc sĩ',
        experience: '10 năm kinh nghiệm phẫu thuật mắt',
        gender: 'female',
        dateOfBirth: new Date('1985-08-20'),
        address: '456 Đường XYZ, Quận 2, TP.HCM',
        isActive: true,
        departmentId: savedDepartments[2].id,
        userId: savedUsers[2].id, // doctorUser2
      },
    ];

    const savedDoctors = await doctorRepository.save(doctors);
    console.log(`✅ Created ${savedDoctors.length} doctors`);

    // 4. Seed Patients
    console.log('👤 Seeding patients...');
    const patients = [
      {
        fullName: 'Nguyễn Văn Bệnh Nhân 1',
        phone: '0987654321',
        email: 'patient1@bookingcare.com',
        gender: 'male',
        dateOfBirth: new Date('1990-01-10'),
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
        userId: savedUsers[3].id, // patientUser1
      },
      {
        fullName: 'Trần Thị Bệnh Nhân 2',
        phone: '0987654323',
        email: 'patient2@bookingcare.com',
        gender: 'female',
        dateOfBirth: new Date('1995-03-25'),
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
        userId: savedUsers[4].id, // patientUser2
      },
    ];

    const savedPatients = await patientRepository.save(patients);
    console.log(`✅ Created ${savedPatients.length} patients`);

    // 5. Seed Medicines
    console.log('💊 Seeding medicines...');
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

    const savedMedicines = await medicineRepository.save(medicines);
    console.log(`✅ Created ${savedMedicines.length} medicines`);

    // 6. Seed Services
    console.log('🏥 Seeding services...');
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

    const savedServices = await serviceRepository.save(services);
    console.log(`✅ Created ${savedServices.length} services`);

    // 7. Seed Rooms
    console.log('🚪 Seeding rooms...');
    const rooms = [
      {
        name: 'Phòng khám 101',
        code: 'RM101',
        floor: 'Tầng 1',
        location: 'Khu A, Tầng 1',
        type: 'examination',
        capacity: 1,
        equipment: 'Khe đèn, máy đo thị lực, máy đo nhãn áp',
        isActive: true,
        departmentId: savedDepartments[0].id,
      },
      {
        name: 'Phòng khám 102',
        code: 'RM102',
        floor: 'Tầng 1',
        location: 'Khu A, Tầng 1',
        type: 'examination',
        capacity: 1,
        equipment: 'Khe đèn, máy đo thị lực, máy đo nhãn áp',
        isActive: true,
        departmentId: savedDepartments[0].id,
      },
      {
        name: 'Phòng phẫu thuật 201',
        code: 'RM201',
        floor: 'Tầng 2',
        location: 'Khu B, Tầng 2',
        type: 'surgery',
        capacity: 1,
        equipment: 'Máy phẫu thuật laser, kính hiển vi phẫu thuật',
        isActive: true,
        departmentId: savedDepartments[2].id,
      },
      {
        name: 'Phòng tư vấn 103',
        code: 'RM103',
        floor: 'Tầng 1',
        location: 'Khu A, Tầng 1',
        type: 'consultation',
        capacity: 2,
        equipment: 'Bàn, ghế, máy tính',
        isActive: true,
        departmentId: savedDepartments[1].id,
      },
    ];

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Users: ${savedUsers.length}`);
    console.log(`   - Departments: ${savedDepartments.length}`);
    console.log(`   - Doctors: ${savedDoctors.length}`);
    console.log(`   - Patients: ${savedPatients.length}`);
    console.log(`   - Medicines: ${savedMedicines.length}`);
    console.log(`   - Services: ${savedServices.length}`);
    console.log('\n🔑 Default password for all users: password123');

    if (isInitialized) {
      await dataSource.destroy();
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    if (isInitialized && dataSource.isInitialized) {
      await dataSource.destroy();
    }
    process.exit(1);
  }
}

seed();
