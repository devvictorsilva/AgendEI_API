import { DataSource } from 'typeorm';
import { Agendamento } from './agendamento.entity';

export const agendamentoProviders = [
  {
    provide: 'AGENDAMENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Agendamento),
    inject: ['DATA_SOURCE'],
  },
];
