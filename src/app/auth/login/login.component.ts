import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ValidatorsService } from '../../services/validators/validators.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public formSubmit:boolean = false;

  public formLogin = this.fb.group({
    email: ['patoserra74@hotmail.com',[Validators.required,Validators.pattern(this.validatorService.emailRegistroPattern)]],
    password: ['123456',[Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
    remember: [false]
  })

  constructor(private fb:FormBuilder ,private validatorService : ValidatorsService, private userService:UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  campoNoValido(campo:string){
   
      if (this.formLogin.get(campo)!.invalid && this.formSubmit){
        return true
      }
      return false;
  
  }

  logear(){
    this.formSubmit = true;

    if (this.formLogin.invalid){
      return;
    }

    this.userService.logearUsuario(this.formLogin.value)
    .subscribe(
      (res:any) =>{
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/');
      },(err) => {
        Swal.fire('Error!',err.error.msg,'error');
      }
    )
  }

}
