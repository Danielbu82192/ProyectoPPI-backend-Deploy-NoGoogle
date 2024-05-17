import { Module } from '@nestjs/common';
import { EquipoUsuariosService } from './equipo_usuarios.service';
import { EquipoUsuariosController } from './equipo_usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoUsuario } from './entities/equipo_usuario.entity';
import { EquipoPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';
import { EquipoPpiPjic } from 'src/equipo_ppi_pjic/entities/equipo_ppi_pjic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EquipoUsuario]),
    TypeOrmModule.forFeature([EquipoPpi]) ,
    TypeOrmModule.forFeature([EquipoPpiPjic]) 
  ],
  controllers: [EquipoUsuariosController],
  providers: [EquipoUsuariosService],
})
export class EquipoUsuariosModule {}
