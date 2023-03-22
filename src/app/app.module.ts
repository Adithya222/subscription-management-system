import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {UsersProfileComponent} from './pages/users-profile/users-profile.component';
import {PagesFaqComponent} from './pages/pages-faq/pages-faq.component';
import {PagesContactComponent} from './pages/pages-contact/pages-contact.component';
import {PagesRegisterComponent} from './pages/pages-register/pages-register.component';
import {PagesLoginComponent} from './pages/pages-login/pages-login.component';
import {PagesError404Component} from './pages/pages-error404/pages-error404.component';
import {PagesBlankComponent} from './pages/pages-blank/pages-blank.component';
import {InitializerService} from "./core/services/auth/initializer.service";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {StoreService} from "./core/services/store";
import {KeycloakGuard} from "./core/services/auth/keycloak-guard.service";
import {NgxPermissionsModule} from "ngx-permissions";
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {appReducer} from "./core/store/app.state";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {CustomSerializer} from "./core/router/custom-serializer";
import {ToastrModule} from "ngx-toastr";
import {CommonModule, DatePipe} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpService} from "./core/services/http.service";
import {MessageService} from "primeng/api";
import {NgxSpinnerModule} from "ngx-spinner";


export function initializeConfig(config: InitializerService) {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      config.load().then(response => {
        resolve(response);
      });
    });
  };
}


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    NgxPermissionsModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot({
      //preventDuplicates: true
    }),
    NgxPermissionsModule.forRoot(),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    CoreModule,
    NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'}),
  ],
  providers: [
    InitializerService,
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfig,
      multi: true,
      deps: [InitializerService]
    },
    HttpService,
    StoreService,
    KeycloakGuard,
    MessageService,
    DatePipe
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
