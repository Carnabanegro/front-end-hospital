import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators/validators.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FileUploadService } from '../../services/common/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formSubmit = false;
  imagenPick = false;

  public formProfile= this.fb.group({
    nombre: [this.userService.usuario?.nombre || '',[Validators.required,Validators.minLength(3),Validators.maxLength(16),Validators.pattern(this.validatorService.nombreRegistroPattern)]],
    password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
    password2: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
    email: [this.userService.usuario?.email || '',[Validators.required,Validators.pattern(this.validatorService.emailRegistroPattern)]]
  },{
    validators:[ this.validatorService.camposIguales('password','password2' ) ]
  })

  public formAvatar= this.fb.group({
    img:['',Validators.required]
  })

  public usuario : Usuario = new Usuario('','') 

  constructor( 
    private userService : UsuarioService, 
    private fb:FormBuilder, 
    private validatorService:ValidatorsService, 
    private router:Router,
    private fileService: FileUploadService
    
    ) { 
    this.usuario = userService.usuario;
  }

  ngOnInit(): void {
    
  }


  campoNoValido(campo:string):boolean{
    if (this.formProfile.get(campo)!.invalid && this.formSubmit){
      return true
    }
    return false;
  }

  passCoindicen(){
    if (this.formProfile.get('password2')!.getError('notEquals') && this.formSubmit ){
      return true;
    }
    return false;
  }

  modificar(){

    this.formSubmit = true;

    if (this.formProfile.invalid){
      return;
    }
    const userId = this.userService.usuario?.uid  || null;
    if (!userId){
      Swal.fire('Error!','user problem','error');
      return;
    }

    this.userService.updateUsuario(this.formProfile.value, userId )
    .subscribe(
      (resp:any) =>{
        this.usuario.nombre = resp.usuarios.nombre;
        this.usuario.email = resp.usuarios.email;
        Swal.fire('Success!','Cambios Guardados','success');
        this.router.navigateByUrl('/');
      },(err) => {
        Swal.fire('Error!',err.error.msg,'error');
      }
    )
   
  }

  uploadImage(){

    const userId = this.userService.usuario?.uid  || null;
    const imagen = this.formAvatar.get('img')?.value;
    if(userId && imagen){
      this.fileService.changeAvatar(userId!, 'usuarios', imagen)
      .subscribe(
        resp =>{
          this.usuario.img = resp.nombreArchivo;
          Swal.fire('Success!','Imagen Subida','success');
        },(err) => {
          Swal.fire('Error!',err.error.msg,'error');
        }
      )
    }
    return;
    
  }

  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formAvatar.patchValue({
        img: file
      });
    }
  }

  imagenNoValido(campo:string):boolean{
    if (this.formAvatar.get(campo)!.invalid && this.formAvatar.get(campo)?.touched){
      return true
    }
    return false;
  }


}
