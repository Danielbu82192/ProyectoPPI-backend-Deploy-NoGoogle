import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }
  


  @Get('/asesor/')
  findAsesor() {
    return this.usuarioService.findAsesor();
  }

  @Get('/correos/:correo') 
  findCorreo(@Param('correo') correo: string) {
    return this.usuarioService.findCorreo(correo);
  }
  
  @Get('ExisteSesion')
  finExisteSesion() {
    return this.usuarioService.finExisteSesion();
  }
/*
  @Get(':Correo')
  Login(@Param('Correo') Correo: string) {
    return this.usuarioService.Login(Correo);
  }
*/
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }  


  @Patch('/correo/:id')
  updateSesion(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.updateSesion(id, updateUsuarioDto);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }
 
  @Delete('/limpiarSistema/')
  removeSistem() {
    return this.usuarioService.removeSistem();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

}
