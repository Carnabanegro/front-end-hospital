import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ValidatorsService } from '../../services/validators/validators.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  public formSubmit:boolean = false;

  public formRegister = this.fb.group({
    nombre: ['patricio serra',[Validators.required,Validators.minLength(3),Validators.maxLength(16),Validators.pattern(this.validatorService.nombreRegistroPattern)]],
    password: ['123456',[Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
    password2: ['123456',[Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
    remember: [false,Validators.required],
    email: ['@gmail.com',[Validators.required,Validators.pattern(this.validatorService.emailRegistroPattern)]]
  },{
    validators:[ this.validatorService.camposIguales('password','password2' ) ]
  })

  constructor(private fb:FormBuilder, private  validatorService: ValidatorsService, private userioService: UsuarioService, private router : Router) { }

  crearUsuario(){

    this.formSubmit = true;

    this.userioService.crearUsuario(this.formRegister.value)
    .subscribe(
      (msg) =>{
        this.router.navigateByUrl('/');
      },(err) => {
        Swal.fire('Error!',err.error.msg,'error');
      }
    )
   
  }

  campoNoValido(campo:string):boolean{
    if (this.formRegister.get(campo)!.invalid && this.formSubmit){
      return true
    }
    return false;
  }

  passCoindicen(){
    if (this.formRegister.get('password2')!.getError('notEquals') && this.formSubmit ){
      return true;
    }
    return false;
  }

}
