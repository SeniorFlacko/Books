import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(public auth: AuthService, public router: Router) {}

  canActivate():boolean {
    if (!this.auth.isAuthenticated) {
      this.router.navigate(['/login']);
      console.error('No autorizado.');
      
      return false;
    }
    return true;
  }
}
