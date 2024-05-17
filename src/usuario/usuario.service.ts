import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config'; 
import { Notificacione } from 'src/notificaciones/entities/notificacione.entity';
import { EstadoSeguimientoCambio } from 'src/estado_seguimiento_cambio/entities/estado_seguimiento_cambio.entity';
import { SeguimientoPpi } from 'src/seguimiento_ppi/entities/seguimiento_ppi.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';
import { EquipoPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';
import { Semana } from 'src/semanas/entities/semana.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private readonly repository: Repository<Usuario>,
    @InjectRepository(Notificacione) private readonly repositoryNotificacion: Repository<Notificacione>,
    @InjectRepository(EstadoSeguimientoCambio) private readonly repositoryEstadoSeguimientoCambio: Repository<EstadoSeguimientoCambio>,
    @InjectRepository(SeguimientoPpi) private readonly repositorySeguimientoPpi: Repository<SeguimientoPpi>,
    @InjectRepository(CitasAsesoriaPpi) private readonly repositoryCitasAsesoriaPpi: Repository<CitasAsesoriaPpi>,
    @InjectRepository(EquipoPpi) private readonly repositoryEquipoPpi: Repository<EquipoPpi>,
    @InjectRepository(Semana) private readonly repositorySemana: Repository<Semana>,
    private configService: ConfigService) {
  }

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  async findAsesor() {
    return this.repository.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.rol', 'rol')
      .leftJoinAndSelect('usuario.hora', 'HoraSemanal')
      .where('rol.id = 3')
      .getMany();
  }

  async finExisteSesion() {
    return this.configService.get<string>('CUENTA_GOOGLE');
  }

  async findAll() {
    return this.repository.find();
  }

  async Login(Correo: string) {
    return this.repository.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.hora', 'HoraSemanal')
      .leftJoinAndSelect('usuario.rol', 'rol')
      .where('usuario.correo = :correo', { correo: Correo }) 
      .getOne()
  }
  async findOne(id: number) {
    return this.repository.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.hora', 'HoraSemanal')
      .where('usuario.id = :id', { id: id })
      .getOne();
  }

  async findCorreo(correo: string) {
    return this.repository.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.rol', 'Rol')
      .leftJoinAndSelect('usuario.hora', 'HoraSemanal')
      .leftJoinAndSelect('usuario.usuario', 'EquipoUsuario')  
      .where('usuario.correo = :correo', { correo: correo })
      .getOne();
  }
  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `kk`;
  }

  async updateSesion(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const existe = await this.repository
      .createQueryBuilder('usuario')
      .where('usuario.correo = :id', { id: id })
      .getOne();
    if (!existe) {
      throw new NotFoundException('No encontrado');
    }
    return this.repository.update(existe.id, updateUsuarioDto);
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
  
  async removeSistem() {
    const notif= this.repositoryNotificacion.clear();
    const estadoSeg= this.repositoryEstadoSeguimientoCambio.clear();
    const seguim= this.repositorySeguimientoPpi.clear();
    const citas= this.repositoryCitasAsesoriaPpi.clear();
    const equipo= this.repositoryEquipoPpi.clear();
    const semana= this.repositorySemana.clear();
    if(notif && estadoSeg && seguim && seguim && citas && equipo && semana)
      return true
    else
      return false
  }
  
}
