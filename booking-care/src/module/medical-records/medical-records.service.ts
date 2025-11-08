import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicalRecordRepository } from '../../database/repositories/medical-record.repository';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { AppointmentRepository } from 'src/database/repositories/appointment.repository';
import { DoctorRepository } from 'src/database/repositories/doctor.repository';
import { PatientRepository } from 'src/database/repositories/patient.repository';

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

  async findAll() {
    return await this.medicalRecordRepository.find({
      relations: ['patient', 'doctor', 'appointment', 'treatments'],
    });
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
