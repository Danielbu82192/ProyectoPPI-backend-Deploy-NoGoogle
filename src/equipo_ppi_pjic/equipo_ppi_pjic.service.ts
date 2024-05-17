import { Injectable } from '@nestjs/common';
import { CreateEquipoPpiPjicDto } from './dto/create-equipo_ppi_pjic.dto';
import { UpdateEquipoPpiPjicDto } from './dto/update-equipo_ppi_pjic.dto';
import { EquipoPpiPjic } from './entities/equipo_ppi_pjic.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EquipoPpiPjicService {


  constructor(
    @InjectRepository(EquipoPpiPjic) private readonly repository: Repository<EquipoPpiPjic>) {
  }

  create(createEquipoPpiPjicDto: CreateEquipoPpiPjicDto) {
    return 'This action adds a new equipoPpiPjic';
  }

  findAll() {
    return `This action returns all equipoPpiPjic`;
  }

  async findOne(id: number) {
    return this.repository
      .createQueryBuilder('equipoPpiPjic')
      .leftJoinAndSelect('equipoPpiPjic.equipousuariopjic', 'equipoUsuario')
      .leftJoinAndSelect('equipoPpiPjic.usuariopjic', 'usuario')
      .where('equipoUsuario.codigoEquipo = :id', { id: id })
      .getOne();
  }

  update(id: number, updateEquipoPpiPjicDto: UpdateEquipoPpiPjicDto) {
    return `This action updates a #${id} equipoPpiPjic`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipoPpiPjic`;
  }
}
