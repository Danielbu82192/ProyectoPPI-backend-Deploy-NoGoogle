import { Injectable } from '@nestjs/common';
import { CreateEquipoUsuarioDto } from './dto/create-equipo_usuario.dto';
import { UpdateEquipoUsuarioDto } from './dto/update-equipo_usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipoUsuario } from './entities/equipo_usuario.entity';
import { Repository } from 'typeorm';
import { EquipoPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';
import { EquipoPpiPjic } from 'src/equipo_ppi_pjic/entities/equipo_ppi_pjic.entity';

@Injectable()
export class EquipoUsuariosService {

  constructor(
    @InjectRepository(EquipoUsuario) private readonly repository: Repository<EquipoUsuario>,
    @InjectRepository(EquipoPpi) private readonly repositoryBitacora: Repository<EquipoPpi>,
    @InjectRepository(EquipoPpiPjic) private readonly repositoryEquipoPJIC: Repository<EquipoPpiPjic>
  ) {
  }

  create(createEquipoUsuarioDto: CreateEquipoUsuarioDto) {
    return 'This action adds a new equipoUsuario';
  }

  findAll() {
    return `This action returns all equipoUsuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipoUsuario`;
  }

  async findBitacoraByEstudiante(Correo: string) {
    const EquipoUsuario = await this.repository
      .createQueryBuilder("equipoUsuario")
      .leftJoinAndSelect("equipoUsuario.usuario", "usuario")
      .where('usuario.correo = :correo', { correo: Correo }) 
      .getOne();

    if (EquipoUsuario) {
      const Bitacora = await this.repositoryBitacora
        .createQueryBuilder("equipoPpi")
        .where('equipoPpi.codigoEquipo = :cod', { cod: EquipoUsuario.codigoEquipo })
        .getOne();
      return Bitacora;
    }
    return null;
  }

  async findEstudiante() {
    const resultados = await this.repository
      .createQueryBuilder('equipoUsuario')
      .leftJoinAndSelect('equipoUsuario.usuario', 'usuario')
      .getMany();
    const resultadosAgrupados = {};
    resultados.forEach((resultado) => {
      const key = resultado.codigoEquipo;
      if (!resultadosAgrupados[key]) {
        resultadosAgrupados[key] = [];
      }
      resultadosAgrupados[key].push(resultado.usuario);
    });

    return resultadosAgrupados;
  }


  async findEstudianteBitacora() {
    const resultados = await this.repository
      .createQueryBuilder('equipoUsuario')
      .leftJoinAndSelect('equipoUsuario.usuario', 'usuario')
      .getMany();
    const resultadosAgrupados: Record<string, { usuarios: any[], bitacora: any[], moduloSol: any[] }> = {}; // Anotación de tipo explícita
    for (const resultado of resultados) {
      const key = resultado.codigoEquipo;
      if (!resultadosAgrupados[key]) {
        resultadosAgrupados[key] = { usuarios: [], bitacora: [], moduloSol: [] };
      }
      resultadosAgrupados[key].usuarios.push(resultado.usuario);
    }
    for (const [key, value] of Object.entries(resultadosAgrupados)) {
      const bitacora = await this.repositoryBitacora
        .createQueryBuilder('equipoPpi')
        .where('equipoPpi.codigoEquipo = :id', { id: key })
        .getOne();
      const modSol = await this.repositoryEquipoPJIC
        .createQueryBuilder('EquipoPpiPjic')
        .leftJoinAndSelect('EquipoPpiPjic.usuariopjic', 'usuario')
        .leftJoinAndSelect('EquipoPpiPjic.equipousuariopjic', 'EquipoUsuario')
        .where('EquipoUsuario.codigoEquipo = :id', { id: key })
        .getOne();
      value.moduloSol.push(modSol.usuariopjic);
      if (bitacora != null) {
        value.bitacora.push(bitacora);
      }
    }
    return resultadosAgrupados;
  }

  async findEstudianteBitacoraModSol(id: string) {
    const resultados = await this.repositoryEquipoPJIC
      .createQueryBuilder('EquipoPpiPjic') 
      .leftJoinAndSelect('EquipoPpiPjic.equipousuariopjic', 'EquipoUsuario')
      .where('EquipoPpiPjic.usuariopjic = :id', { id: id })
      .getMany();
    return resultados;
  }


  update(id: number, updateEquipoUsuarioDto: UpdateEquipoUsuarioDto) {
    return `This action updates a #${id} equipoUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipoUsuario`;
  }
}
