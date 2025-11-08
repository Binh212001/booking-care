import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { Prescription } from 'src/database/entities';
import { AppointmentRepository } from 'src/database/repositories/appointment.repository';
import { DoctorRepository } from 'src/database/repositories/doctor.repository';
import { PatientRepository } from 'src/database/repositories/patient.repository';
import { PrescriptionRepository } from '../../database/repositories/prescription.repository';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { PrescriptionReqDto } from './dto/prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { paginate } from 'src/common/offset-pagination/offset-pagination';

@Injectable()
export class PrescriptionsService {
  constructor(
    private readonly prescriptionRepository: PrescriptionRepository,
    private readonly patientRepository: PatientRepository,
    private readonly doctorRepository: DoctorRepository,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async create(createPrescriptionDto: CreatePrescriptionDto) {
    const { patientId, doctorId, appointmentId, ...prescriptionData } =
      createPrescriptionDto;
    const [patient, doctor, appointment] = await Promise.all([
      this.patientRepository.findOne({
        where: { id: patientId },
      }),
      this.doctorRepository.findOne({
        where: { id: doctorId },
      }),
      this.appointmentRepository.findOne({
        where: { id: appointmentId },
      }),
    ]);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }
    if (!appointment) {
      throw new NotFoundException(
        `Appointment with ID ${appointmentId} not found`,
      );
    }
    const prescription = this.prescriptionRepository.create({
      patient,
      doctor,
      appointment,
      ...prescriptionData,
    });
    return await this.prescriptionRepository.save(prescription);
  }

  async findAll(
    prescriptionReqDto: PrescriptionReqDto,
  ): Promise<OffsetPaginatedDto<Prescription>> {
    const { page, limit, order, patientId, doctorId, appointmentId } =
      prescriptionReqDto;

    const query = this.prescriptionRepository
      .createQueryBuilder('prescription')
      .leftJoinAndSelect('prescription.patient', 'patient')
      .leftJoinAndSelect('prescription.doctor', 'doctor')
      .leftJoinAndSelect('prescription.appointment', 'appointment')
      .leftJoinAndSelect(
        'prescription.prescriptionMedicines',
        'prescriptionMedicines',
      )
      .leftJoinAndSelect('prescriptionMedicines.medicine', 'medicine');

    const [data, metaDto] = await paginate(query, prescriptionReqDto, {
      skipCount: false,
      takeAll: prescriptionReqDto.takeAll,
    });

    return new OffsetPaginatedDto<Prescription>(data, metaDto);
  }

  async findOne(id: string) {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id },
      relations: [
        'patient',
        'doctor',
        'appointment',
        'prescriptionMedicines',
        'prescriptionMedicines.medicine',
      ],
    });

    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }

    return prescription;
  }

  async update(id: string, updatePrescriptionDto: UpdatePrescriptionDto) {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id },
    });
    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
    const { patientId, doctorId, appointmentId, ...prescriptionData } =
      updatePrescriptionDto;

    Object.assign(prescription, prescriptionData);

    if (patientId) {
      const patient = await this.patientRepository.findOne({
        where: { id: patientId },
      });
      if (!patient) {
        throw new NotFoundException(`Patient with ID ${patientId} not found`);
      }
      prescription.patient = patient;
    }
    if (doctorId) {
      const doctor = await this.doctorRepository.findOne({
        where: { id: doctorId },
      });
      if (!doctor) {
        throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
      }
      prescription.doctor = doctor;
    }
    if (appointmentId) {
      const appointment = await this.appointmentRepository.findOne({
        where: { id: appointmentId },
      });
      if (!appointment) {
        throw new NotFoundException(
          `Appointment with ID ${appointmentId} not found`,
        );
      }
      prescription.appointment = appointment;
    }
    return await this.prescriptionRepository.save(prescription);
  }

  async remove(id: string) {
    const prescription = await this.prescriptionRepository.exists({
      where: { id },
    });
    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
    return await this.prescriptionRepository.softDelete(id);
  }
}
