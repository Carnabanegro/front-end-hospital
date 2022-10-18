import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UsuarioService, private router: Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)/*: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree*/ {

      return this.userService.validarToken()
      .pipe(
        tap((resp:any)=> {
            if (!resp){
              this.router.navigateByUrl('/login');
            }
          }
        )
      )
    
  }
  
}
