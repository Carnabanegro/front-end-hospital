import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { delay, observable, Observable, Subscription } from 'rxjs';
import { BusquedaService } from '../../services/common/busqueda.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  subscriptions : Subscription[] = [];
  
  usuarios : Usuario[] = [];
  total: number = 0;
  numPage: number = 0;
  cantPages: number = 0;
  loading: boolean = true;
  busqueda: string = '';

  constructor(private userService : UsuarioService,private busquedaService: BusquedaService) { }

  ngOnInit(): void {
    this.loading=true;
    const sub:any = this.userService.getUsuarios(this.numPage).subscribe(
      (resp:any) => {
          if (resp){
            this.usuarios = resp.usuarios;
            this.total = resp.total;
            this.cantPages = Math.floor(this.total/5)+1
            this.loading = false;
          }
      },(err) => {
        Swal.fire('Error!','Error desconocido','error')
      }
    );
    this.subscriptions.push(sub)
  }


  anterior(){
    
    if (this.numPage>0){
      this.loading = true;
      this.numPage--;
      //   var sub= this.userService.getUsuarios(this.numPage).subscribe(
      //     (resp:any) => {
      //         if (resp){
      //           this.usuarios = resp.usuarios;
      //           this.total = resp.total;
      //           this.cantPages = Math.floor(this.total/5)+1
      //           this.loading = false;
      //         }
      //     },(err) => {
      //       Swal.fire('Error!','Error desconocido','error')
      //     }
      //   );
      // this.subscriptions.push(sub)
      this.buscar(this.busqueda,this.numPage);
      
    }
    return;
    
  }

  siguiente(){
    if (Math.floor(this.total/5) > this.numPage){
      this.numPage++;
      this.loading = true;
      // var sub = this.userService.getUsuarios(this.numPage).subscribe(
      //   (resp:any) => {
      //       if (resp){
      //         this.usuarios = resp.usuarios;
      //         this.total = resp.total;
      //         this.cantPages = Math.floor(this.total/5)+1
      //         this.loading = false;
      //       }
      //   },(err) => {
      //     Swal.fire('Error!','Error desconocido','error')
      //   }
      // );
      // this.subscriptions.push(sub)
      this.buscar(this.busqueda,this.numPage)

    }
    return;
    
  }


  buscarInput(search : string){
    this.busqueda = search;
    this.buscar(search,0);
  }

  buscar(search : string,page: number){
    
    if(search.trim().length>=3){
      
      var sub = this.busquedaService.getBusqueda('usuarios',5,this.numPage,search).subscribe(
        (resp:any) => {
            if (resp){
              this.usuarios = resp.usuarios;
              this.total = resp.total;
              this.cantPages = Math.floor(this.total/5)+1
              console.log(this.cantPages)
              this.loading = false;
            }
        },(err) => {
          Swal.fire('Error!','Error desconocido','error')
        }
      );
      this.subscriptions.push(sub)

    }
      
  
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

}
