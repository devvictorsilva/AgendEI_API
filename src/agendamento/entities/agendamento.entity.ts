import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AtendimentoTipo, StatusAgendamento } from '../enums';

@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  cliente: string;

  @Column({
    type: 'enum',
    enum: AtendimentoTipo,
    nullable: false,
  })
  tipo_atendimento: AtendimentoTipo;

  @Column({
    type: 'enum',
    enum: StatusAgendamento,
    default: StatusAgendamento.PENDENTE,
    nullable: false,
  })
  status: StatusAgendamento;

  @Column({ type: 'timestamp', nullable: true })
  data_hora: Date;
}
