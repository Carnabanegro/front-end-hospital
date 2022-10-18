import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.api;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http:HttpClient) { }

  changeAvatar(
    id:string,
    tabla:'usuarios'|'medicos'|'hospitales',
    path : string
    ):Observable<any>{


    //CON JAVASCRIPT  
    // try {

    //   //preparo todo para enviar peticion con imagen
    //   const url = `${base_url}/upload/${tabla}/${id}`;
    //   const formData = new FormData();
    //   formData.append('imagen',file);

    //   const resp = await fetch(url, {
    //     method: 'PUT',
    //     headers:{
    //       'x-token': localStorage.getItem('token') || ''
    //     },
    //     body: formData
    //   });

    //   console.log(resp)

    // } catch (error) {
    //   console.log(error)
    // }

  
    const url = `${base_url}/upload/${tabla}/${id}`;
    const formData: FormData = new FormData();
    formData.append('imagen', path );
    return this.http.put<Observable<any>>(url, formData, { reportProgress: true,headers: {'x-token': localStorage.getItem('token')|| ''} });
    
  }

}
