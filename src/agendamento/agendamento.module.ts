import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AgendamentoController } from './agendamento.controller';
import { AgendamentoService } from './agendamento.service';
import { agendamentoProviders } from './entities/adendamentos.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AgendamentoController],
  providers: [AgendamentoService, ...agendamentoProviders],
})
export class AgendamentoModule {}
