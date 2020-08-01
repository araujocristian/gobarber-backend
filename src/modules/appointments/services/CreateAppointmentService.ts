import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
/**
 * [x] Recebimento das informações
 * [x] Trativa de erros/excessões
 * [x] Acesso ao repositório
 */

interface IRequest {
  provider_id: string;
  date: Date;
}

/**
 * Dependency Inversion (SOLID)
 *
 * Single Responsibility Principle
 * Liskov Substitution Principle
 * Dependency Inversion Principle
 */

class CreateAppointmentService {
  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
