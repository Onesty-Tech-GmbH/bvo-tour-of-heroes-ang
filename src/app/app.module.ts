import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';

import { AppRoutingModule } from './app-routing.module';
import { HeroesModule } from './heroes/heroes.module';
import { AuthModule } from './auth/auth.module';
import {DOCUMENT, PlatformLocation} from "@angular/common";
import {PortalPlatformLocation} from "./PortalPlatformLocation";
import * as H from "history";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {KeycloakTokens} from "../main";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HeroesModule,
    AuthModule,
    AppRoutingModule,
    KeycloakAngularModule,
  ],
  declarations: [
    AppComponent,
    ComposeMessageComponent,
    PageNotFoundComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, "PORTAL_TOKENS"]
    },
    {
      provide: PlatformLocation,
      useFactory: platformFactory,
      deps: [DOCUMENT, "HISTORY"]
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}

function platformFactory(doc: any, history: H.History) {
  console.log("CREATE Portal Platform WITH HISTORY", history)
  return new PortalPlatformLocation(doc, history);
}

function initializeKeycloak(keycloak: KeycloakService, tokens?:KeycloakTokens) {
  console.log("Tokens received from Portal?", tokens)
  console.log("Stage-specific configuration?", (window as any).env);
  const url = (window as any).env?.KEYCLOAK_URL ?? 'http://keycloak.bvo.local/auth';
  const realm = (window as any).env?.KEYCLOAK_REALM ?? 'Barmenia-Develop';
  const clientId = (window as any).env?.KEYCLOAK_CLIENT_ID ?? 'BVO_WebpartsReact';
  return () =>
     keycloak.init({
       config: {url, realm, clientId},
       initOptions:{
         ...tokens,
         onLoad: tokens?.token ? undefined : 'login-required',
         checkLoginIframe: false, enableLogging: true
       }
     });
}
