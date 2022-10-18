import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  profile : Usuario | undefined;

  constructor( private userService: UsuarioService ) {
    
  }

  ngOnInit(): void {
    console.log(this.userService.usuario)
    this.profile= this.userService.usuario;
  }

}
