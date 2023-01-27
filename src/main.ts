import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import * as H from "history";
import {AppModule} from './app/app.module';
import {ValueProvider} from "@angular/core";
import {createBrowserHistory} from "history";
import {APP_BASE_HREF} from "@angular/common";

export interface KeycloakTokens {
	token: string;
	refreshToken?: string;
	idToken?: string;
}

(window as any)["mount"] = (containerId: string, tokens?: KeycloakTokens, history?: H.History) => {
	//create the element for "selector" of the AppModule
	let targetElement = document.getElementById(containerId);
	let appRootElement = document.createElement("app-root");
	targetElement!.append(appRootElement);
	const appBaseProvider: ValueProvider  = {provide: APP_BASE_HREF, useValue: '/'}
	const historyProvider: ValueProvider  = {provide: "HISTORY", useValue: history !== undefined ? history : createBrowserHistory()}
	const tokenProvider: ValueProvider    = {provide: "PORTAL_TOKENS", useValue: tokens};
	platformBrowserDynamic([historyProvider,appBaseProvider,tokenProvider])
		.bootstrapModule(AppModule, {})
		.catch(err => console.error(err));
}
