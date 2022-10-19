import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RegisterForm } from '../../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { LoginForm, LoginResponse } from '../../interfaces/login-form.interface';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Usuario } from 'src/app/models/usuario.model';

const base_url = environment.api;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario : Usuario = new Usuario('','');

  constructor(private http : HttpClient,private router: Router) {  }

  validarToken(): Observable<boolean>{

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`,{
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp:any) => {

        this.usuario = new Usuario(resp.usuario.nombre,resp.usuario.email,undefined,resp.usuario.role,resp.usuario.google,resp.usuario.uid,resp.usuario.img)
        localStorage.setItem('token',resp.token);
      }),
      map((resp)=>true),
      catchError(error=> of(false))
    )
  }

  crearUsuario( formData: RegisterForm ) {
    
    return this.http.post(`${ base_url }/usuarios/createUsuario`, formData )
  }

  updateUsuario( formData: RegisterForm, uid: string ) {
    delete formData.password2;
    return this.http.put(`${ base_url }/usuarios/updateUsuario/${uid}`, formData, {
      headers:{
        'x-token': localStorage.getItem('token') || ''
      }
    } )
  }

  logearUsuario(formData : LoginForm){
    return this.http.post(`${ base_url }/login`, formData)
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    /*this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });*/
  }

  getProfile(){
    const token = localStorage.getItem('token') || '';
    //decripto el token
    const decrypt: any= jwt_decode(token);
    const {uid} = decrypt
    return this.http.get(`${ base_url }/usuarios/${uid}`,{
      headers: {
        'x-token': token
      }
    })
  }

  getUsuarios(desde:number){
    const token = localStorage.getItem('token') || '';
    //decripto el token
    return this.http.get(`${ base_url }/usuarios/`,{
      headers: {
        'x-token': token
      },
      params:{
        desde: (desde*5).toString(),
        cant:5
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
