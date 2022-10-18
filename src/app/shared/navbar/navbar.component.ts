import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
/*import { tap, catchError } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { ProfileInterface } from 'src/app/interfaces/profile.interface';*/

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  profile: Usuario | undefined;
  /*profile: ProfileInterface = {
    nombre: '',
    uid: '',
    role: '',
    img:''
  } ;*/

  constructor(private userService : UsuarioService, private router:Router) { }

  ngOnInit(): void {

    this.profile = this.userService.usuario;

    /*this.userService.getProfile().subscribe(
      (res:any) =>{
        
      },(err) => {
        Swal.fire('Error!',err.error.msg,'error');
      }
    )*/
  }

  logout(){
    this.userService.logout();
  }

}
