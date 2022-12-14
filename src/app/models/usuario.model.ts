import { environment } from '../../environments/environment';

const base_url = environment.api;

export class Usuario {

    constructor(
        public nombre:string,
        public email:string,
        public password?:string,
        public role?:string,
        public google?:string,
        public uid?: string,
        public img?: string
    ){}

    

    get urlImages(): string {
        
        if (this.img){
            return `${base_url}/upload/usuarios/${this.img}`
        }else{
            return `${base_url}/upload/usuarios/no-img.jpg`
        }
    }
}