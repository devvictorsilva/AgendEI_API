import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { Agendamento } from './entities/agendamento.entity';
import { StatusAgendamento } from './enums';

@Injectable()
export class AgendamentoService {
  constructor(
    @Inject('AGENDAMENTO_REPOSITORY')
    private agendamentoRepository: Repository<Agendamento>,
  ) {}

  async getAll() {
    const agendamentos = await this.agendamentoRepository.find({
      where: {
        status: StatusAgendamento.PENDENTE,
      },
      select: {
        id: true,
        cliente: true,
        tipo_atendimento: true,
        status: true,
      },
    });

    const prioridadeMap: Record<string, number> = {
      Prioridade: 1,
      Agendado: 2,
      'Ordem de chegada': 3,
    };

    return agendamentos.sort((a, b) => {
      const prioridadeA = prioridadeMap[a.tipo_atendimento] || 99;
      const prioridadeB = prioridadeMap[b.tipo_atendimento] || 99;
      return prioridadeA - prioridadeB;
    });
  }

  async create(createAgendamentoDto: CreateAgendamentoDto) {
    return await this.agendamentoRepository.save(createAgendamentoDto);
  }

  async remove(id: string) {
    const agendamento = await this.agendamentoRepository.findOneBy({ id });
    if (!agendamento) {
      return new NotFoundException(`Agendamento com ID ${id} não encontrado.`);
    }
    return await this.agendamentoRepository
      .update(id, {
        status: StatusAgendamento.CONCLUIDO,
      })
      .then(() => {
        return { message: `Atendimento concluído!` };
      });
  }
}
