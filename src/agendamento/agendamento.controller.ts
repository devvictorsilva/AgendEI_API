import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';

@Controller('agendamento')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Get('listar')
  getAll() {
    return this.agendamentoService.getAll();
  }

  @Post('criar')
  create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
    return this.agendamentoService.create(createAgendamentoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory() {
          return new BadRequestException(`O ID fornecido não é válido.`);
        },
      }),
    )
    id: string,
  ) {
    return this.agendamentoService.remove(id);
  }
}
