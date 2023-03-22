
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";
import {InitializerService} from "./initializer.service";

@Injectable()
export class KeycloakGuard extends KeycloakAuthGuard {

  constructor(
    protected override router: Router,
    protected keycloakService: KeycloakService,
    private initializeService:InitializerService
  ) {
    super(router, keycloakService);
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean>{
  //   return new Promise(async (resolve, reject) => {
  //     let isloggedin = await this.keycloakService.isLoggedIn();
  //     console.log("can Activate")
  //
  //     console.log(isloggedin)
  //     resolve(isloggedin);
  //   });
  // }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {

      if (!this.authenticated) {
        this.keycloakService.login();
        return;
      }

      this.initializeService.updateToken();

      const requiredRoles = route.data['roles'];
      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      } else {
        if (!this.roles || this.roles.length === 0) {
          resolve(false);
        }
        let granted: boolean = false;
        for (const requiredRole of requiredRoles) {
          if (this.roles.indexOf(requiredRole) > -1) {
            granted = true;
            break;
          }
        }
        resolve(granted);
      }
    });
  }

}
