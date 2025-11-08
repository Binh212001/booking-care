import { Patient } from './../../database/entities/patient.entity';
import { Entity } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrescriptionRepository } from '../../database/repositories/prescription.repository';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { DoctorRepository } from 'src/database/repositories/doctor.repository';
import { AppointmentRepository } from 'src/database/repositories/appointment.repository';
import { PatientRepository } from 'src/database/repositories/patient.repository';
import { Appointment, Doctor, Prescription } from 'src/database/entities';

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

  async findAll() {
    return await this.prescriptionRepository.find({
      relations: [
        'patient',
        'doctor',
        'appointment',
        'prescriptionMedicines',
        'prescriptionMedicines.medicine',
      ],
    });
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
