import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DoctorRepository } from 'src/database/repositories/doctor.repository';
import { ServiceRepository } from 'src/database/repositories/service.repository';
import { Between, Not } from 'typeorm';
import { AppointmentRepository } from '../../database/repositories/appointment.repository';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { paginate } from 'src/common/offset-pagination/offset-pagination';
import { AppointmentReqDto } from './dto/appointment.dto';
import { Appointment } from 'src/database/entities';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { OffsetPaginationDto } from 'src/common/offset-pagination/offset-pagination.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly doctorRepository: DoctorRepository,
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const {
      patientId,
      doctorId,
      serviceId,
      appointmentDate,
      startTime,
      endTime,
    } = createAppointmentDto;
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }
    const service = await this.serviceRepository.findOne({
      where: { id: serviceId },
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${serviceId} not found`);
    }
    //Check appointment time is available in doctor's calendar
    const appointmentExist = await this.appointmentRepository.exists({
      where: {
        doctor: { id: doctorId },
        appointmentDate: appointmentDate,
        startTime: Between(startTime, endTime),
        endTime: Between(startTime, endTime),
        status: Not('cancelled'),
      },
    });
    if (appointmentExist) {
      throw new BadRequestException('Appointment time is not available');
    }
    const appointment = this.appointmentRepository.create({
      patientId,
      doctorId,
      serviceId,
      appointmentDate,
      startTime,
      endTime,
    });
    //send email to patient and doctor
    return await this.appointmentRepository.save(appointment);
  }

  async findAll(
    appointmentReqDto: AppointmentReqDto,
  ): Promise<OffsetPaginatedDto<Appointment>> {
    const {
      patientId,
      doctorId,
      serviceId,
      appointmentDate,
      startTime,
      endTime,
    } = appointmentReqDto as any;

    const query = this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('appointment.service', 'service');

    if (patientId) {
      query.andWhere('appointment.patientId = :patientId', { patientId });
    }
    if (doctorId) {
      query.andWhere('appointment.doctorId = :doctorId', { doctorId });
    }
    if (serviceId) {
      query.andWhere('appointment.serviceId = :serviceId', { serviceId });
    }
    if (appointmentDate) {
      query.andWhere('appointment.appointmentDate = :appointmentDate', {
        appointmentDate,
      });
    }
    if (startTime) {
      query.andWhere('appointment.startTime = :startTime', { startTime });
    }
    if (endTime) {
      query.andWhere('appointment.endTime = :endTime', { endTime });
    }

    const [base, metaDto] = await paginate(query, appointmentReqDto, {
      skipCount: false,
      takeAll: appointmentReqDto.takeAll,
    });

    return new OffsetPaginatedDto<Appointment>(base, metaDto);
  }

  async findOne(id: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['patient', 'doctor', 'room', 'service'],
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }
  // Just update status, reason, notes
  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);
    Object.assign(appointment, updateAppointmentDto);
    return await this.appointmentRepository.save(appointment);
  }

  async remove(id: string) {
    const appointment = await this.findOne(id);
    return await this.appointmentRepository.softDelete(id);
  }
}
