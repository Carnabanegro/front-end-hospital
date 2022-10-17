import { Injectable } from '@angular/core';
import { AbstractControl,  FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  
//Patrones para validaciones sincronas

nombreRegistroPattern : string = '([a-zA-z]+) ([a-zA-z]+)';
emailRegistroPattern : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

constructor() { }

//Validacion sincrona personaliza

noPuedeSerStrider(control: FormControl): ValidationErrors | null{
    const value = control.value?.trim().toLowerCase();
    if (value==='strider'){
        return{
          noStrider: true
        }
    } 
    return null ;
}

camposIguales(campo1:string,campo2:string){


  return (control: AbstractControl) : ValidationErrors | null => {

    const field1 = control.get(campo1)?.value;
    const field2 = control.get(campo2)?.value;

    if (field1 !== field2){
      
      control.get(campo2)?.setErrors({notEquals:true})

      return {
        notEquals: true
      }
    }

    control.get(campo1)?.setErrors(null);
    return null;
  } ;
}

}
