import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicalRecordRepository } from '../../database/repositories/medical-record.repository';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { AppointmentRepository } from 'src/database/repositories/appointment.repository';
import { DoctorRepository } from 'src/database/repositories/doctor.repository';
import { PatientRepository } from 'src/database/repositories/patient.repository';
import { MedicalRecordReqDto } from './dto/medical-record.dto';
import { paginate } from 'src/common/offset-pagination/offset-pagination';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { MedicalRecord } from 'src/database/entities';

@Injectable()
export class MedicalRecordsService {
  constructor(
    private readonly medicalRecordRepository: MedicalRecordRepository,
    private readonly patientRepository: PatientRepository,
    private readonly doctorRepository: DoctorRepository,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    const { patientId, doctorId, appointmentId, ...medicalRecordData } =
      createMedicalRecordDto;
    const patient = await this.patientRepository.findOne({
      where: { id: patientId },
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }
    const appointment = await this.appointmentRepository.findOne({
      where: { id: appointmentId },
    });
    if (!appointment) {
      throw new NotFoundException(
        `Appointment with ID ${appointmentId} not found`,
      );
    }
    const medicalRecord = this.medicalRecordRepository.create({
      patient,
      doctor,
      appointment,
      ...medicalRecordData,
    });
    return await this.medicalRecordRepository.save(medicalRecord);
  }

  async findAll(
    medicalRecordReqDto: MedicalRecordReqDto,
  ): Promise<OffsetPaginatedDto<MedicalRecord>> {
    const { patientId, doctorId, appointmentId, order } = medicalRecordReqDto;

    const query = this.medicalRecordRepository
      .createQueryBuilder('medicalRecord')
      .leftJoinAndSelect('medicalRecord.patient', 'patient')
      .leftJoinAndSelect('medicalRecord.doctor', 'doctor')
      .leftJoinAndSelect('medicalRecord.appointment', 'appointment')
      .leftJoinAndSelect('medicalRecord.treatments', 'treatments');

    if (patientId) {
      query.andWhere('medicalRecord.patientId = :patientId', { patientId });
    }
    if (doctorId) {
      query.andWhere('medicalRecord.doctorId = :doctorId', { doctorId });
    }
    if (appointmentId) {
      query.andWhere('medicalRecord.appointmentId = :appointmentId', {
        appointmentId,
      });
    }

    query.orderBy('medicalRecord.createdAt', order || 'ASC');

    const [data, metaDto] = await paginate(query, medicalRecordReqDto, {
      skipCount: false,
      takeAll: medicalRecordReqDto.takeAll,
    });

    return new OffsetPaginatedDto<MedicalRecord>(data, metaDto);
  }

  async findOne(id: string) {
    const medicalRecord = await this.medicalRecordRepository.findOne({
      where: { id },
      relations: ['patient', 'doctor', 'appointment', 'treatments'],
    });

    if (!medicalRecord) {
      throw new NotFoundException(`Medical record with ID ${id} not found`);
    }

    return medicalRecord;
  }

  async update(id: string, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    const medicalRecord = await this.findOne(id);
    const { patientId, doctorId, appointmentId, ...medicalRecordData } =
      updateMedicalRecordDto;
    if (patientId) {
      const patient = await this.patientRepository.findOne({
        where: { id: patientId },
      });
      if (!patient) {
        throw new NotFoundException(`Patient with ID ${patientId} not found`);
      }
      medicalRecord.patient = patient;
    }
    if (doctorId) {
      const doctor = await this.doctorRepository.findOne({
        where: { id: doctorId },
      });
      if (!doctor) {
        throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
      }
      medicalRecord.doctor = doctor;
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
      medicalRecord.appointment = appointment;
    }
    Object.assign(medicalRecord, medicalRecordData);
    return await this.medicalRecordRepository.save(medicalRecord);
  }

  async remove(id: string) {
    const medicalRecord = await this.findOne(id);
    return await this.medicalRecordRepository.softDelete(id);
  }
}
