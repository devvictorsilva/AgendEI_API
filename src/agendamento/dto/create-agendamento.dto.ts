import { IsEnum, IsNotEmpty } from 'class-validator';

enum AtendimentoTipo {
  PRIORIDADE = 'Prioridade',
  AGENDADO = 'Agendado',
  ORDEM_DE_CHEGADA = 'Ordem de Chegada',
}

export class CreateAgendamentoDto {
  @IsNotEmpty({
    message: 'O campo cliente é obrigatório',
  })
  cliente: string;

  @IsEnum(AtendimentoTipo, {
    message:
      'Tipo de atendimento deve ser Prioridade, Agendado ou Ordem de Chegada',
  })
  tipo_atendimento: AtendimentoTipo;
}
