import {Injectable} from '@angular/core';

import {from, Observable} from 'rxjs';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile, KeycloakTokenParsed} from "keycloak-js";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(public keycloakService: KeycloakService) {
    keycloakService.isLoggedIn().then(x => this.isLoggedIn = true)
  }

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(): Observable<boolean> {
    return from(this.keycloakService.login().then(x => true).catch(x => false));
  }

  parsedToken(): KeycloakTokenParsed|undefined {
    return this.keycloakService.getKeycloakInstance().tokenParsed
  }

  async logout(): Promise<void> {
    await this.keycloakService.logout();
  }
}
