import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import * as H from "history";
import {AppModule} from './app/app.module';
import {ValueProvider} from "@angular/core";
import {createBrowserHistory} from "history";
import {APP_BASE_HREF} from "@angular/common";

(window as any)["mount"] = (containerId: string, tokens?: any, history?: H.History) => {
	//create the element for "selector" of the AppModule
	let targetElement = document.getElementById(containerId);
	let appRootElement = document.createElement("app-root");
	targetElement!.append(appRootElement);
	const appBaseProvider: ValueProvider  = {provide: APP_BASE_HREF, useValue: '/'}
	const historyProvider: ValueProvider  = {provide: "HISTORY", useValue: history !== undefined ? history : createBrowserHistory()}
	platformBrowserDynamic([historyProvider,appBaseProvider])
		.bootstrapModule(AppModule, {})
		.catch(err => console.error(err));
}
