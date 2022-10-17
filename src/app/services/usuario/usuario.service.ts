import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RegisterForm } from '../../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

const base_url = environment.api;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 

  constructor(private http : HttpClient) {  }

  crearUsuario( formData: RegisterForm ) {
    
    return this.http.post(`${ base_url }/usuarios/createUsuario`, formData )
  }
}
