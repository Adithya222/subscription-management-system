import {Injectable} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {NgxPermissionsService} from "ngx-permissions";
import {StoreService} from "../store";
import {AUTH} from "./constants";


@Injectable()
export class InitializerService {

  private token: string = "";
  private keycloakProfile: any;
  private authData: any;
  private authUser: any;
  private company: any;
  private companyConfiguration: any;

  constructor(
    private keycloakService: KeycloakService,
    private permissionService: NgxPermissionsService,
    private http: HttpClient,
    private store: StoreService,
  ) {
  }

  load(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {

      let keycloakConfig: Object = {
        config: {
          url: environment.keycloak.issuer,
          realm: environment.keycloak.realm,
          clientId: environment.keycloak.clientId
        },
        // loadUserProfileAtStartUp: false,
        initOptions: {
          onLoad: 'check-sso',
          checkLoginIframe: false,
        },
        bearerExcludedUrls: []
      };
      let promise = await this.keycloakService.init(keycloakConfig);
      if (promise) {

        this.token = await this.keycloakService.getToken();
        this.keycloakProfile = await this.keycloakService.loadUserProfile();

        this.store.setData(AUTH.currentUser, JSON.stringify(this.keycloakProfile));
        this.store.setData(AUTH.username, this.keycloakProfile.username);
        this.store.setData(AUTH.firstName, this.keycloakProfile.firstName);
        this.store.setData(AUTH.lastName, this.keycloakProfile.lastName);

        // set permissions
        const perm = ["admin"];
        this.permissionService.loadPermissions(perm);

        let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json'});
        let tokenEndpoint = environment.baseUrl + "authenticate";
        this.authUser = this.keycloakProfile;
      }

      resolve(promise);
      return promise;

    });
  }

  updateToken() {
    this.keycloakService.updateToken();
    this.setToken();
  }

  async setToken() {
    this.token = await this.keycloakService.getToken();
  }

  getToken(): string {
    return this.token;
  }

  getKeycloakProfile(): any {
    return this.keycloakProfile;
  }

  getAuthData(): any {
    return this.authData;
  }

  getCompanyConfiguration(): any {
    return this.companyConfiguration;
  }

  getCompany(): any {
    return this.company;
  }

  getAuthUser() {
    return this.authUser;
  }

  logout() {
    this.keycloakService.logout();
    // return this.ngaaUserService.signout();
  }

  login() {
    this.keycloakService.login();
    // return this.ngaaUserService.signout();
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token
    return this.keycloakService.isTokenExpired();
  }

}

interface AuthRequest {
  user: any;
  company: any;
  companyConfiguration: any;
}
