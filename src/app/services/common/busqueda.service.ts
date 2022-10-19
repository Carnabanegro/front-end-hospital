import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { delay, map } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

const base_url = environment.api;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http : HttpClient, private router:Router) { }

  get token(){
    return localStorage.getItem('token') || '';
  }

  getBusqueda(
    tabla: 'usuarios'|'hospitales'|'medicos',
    cant:number,
    desde:number,
    search:string
  ){
    const token = localStorage.getItem('token') || '';
    //decripto el token
    return this.http.get(`${ base_url }/${tabla}/${search}`,{
      headers: {
        'x-token': token
      },
      params:{
        desde: (desde*5).toString(),
        cant
      }
    })
    .pipe(
      delay(1000),
      map((resp:any) =>{
        const usuarios = resp.usuarios.map((user:any) =>new Usuario(user.nombre,user.email,'undefined',user.role,user.google,user.uid,user.img))
        return {
          total:resp.total,
          usuarios
        }
      })
    )
  }

}
