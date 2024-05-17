import { Module } from '@nestjs/common';
import { EquipoPpiPjicService } from './equipo_ppi_pjic.service';
import { EquipoPpiPjicController } from './equipo_ppi_pjic.controller';
import { EquipoPpiPjic } from './entities/equipo_ppi_pjic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([EquipoPpiPjic])
  ],
  controllers: [EquipoPpiPjicController],
  providers: [EquipoPpiPjicService],
})
export class EquipoPpiPjicModule { }
