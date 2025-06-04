import { Module } from '@nestjs/common';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AgendamentoModule, DatabaseModule],
})
export class AppModule {}
