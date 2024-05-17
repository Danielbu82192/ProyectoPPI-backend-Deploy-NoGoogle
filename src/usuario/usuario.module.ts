/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './entities/usuario.entity'; 
import { ConfigModule } from '@nestjs/config';
import { Notificacione } from 'src/notificaciones/entities/notificacione.entity';
import { EstadoSeguimientoCambio } from 'src/estado_seguimiento_cambio/entities/estado_seguimiento_cambio.entity';
import { SeguimientoPpi } from 'src/seguimiento_ppi/entities/seguimiento_ppi.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';
import { EquipoPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';
import { Semana } from 'src/semanas/entities/semana.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    TypeOrmModule.forFeature([Notificacione]), 
    TypeOrmModule.forFeature([EstadoSeguimientoCambio]), 
    TypeOrmModule.forFeature([SeguimientoPpi]), 
    TypeOrmModule.forFeature([CitasAsesoriaPpi]), 
    TypeOrmModule.forFeature([EquipoPpi]),  
    TypeOrmModule.forFeature([Semana]), 
    ConfigModule.forRoot()],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule { }
