
import { Rol } from 'src/rol/entities/rol.entity';
import { Programa } from 'src/programa/entities/programa.entity';
import { HoraSemanal } from 'src/hora_semanal/entities/hora_semanal.entity';
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';
import { EquipoPpiPjic } from 'src/equipo_ppi_pjic/entities/equipo_ppi_pjic.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';
export class CreateUsuarioDto { 
  id: number; 
  nombre: string; 
  documento: string; 
  correo: string; 
  clave: string; 
  datosGoogle: object| null; 
  tokenGoogle: object |null; 
  rol: Rol; 
  programa: Programa; 
  hora: HoraSemanal[]; 
  usuario: EquipoUsuario[]; 
  usuariopjic: EquipoPpiPjic[]; 
  usuariocitaequipo: CitasAsesoriaPpi[];
}
