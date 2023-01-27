import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import * as H from "history";
import {AppModule} from './app/app.module';

(window as any)["mount"] = (containerId: string, tokens?: any, history?: H.History) => {
	//create the element for "selector" of the AppModule
	let targetElement = document.getElementById(containerId);
	let appRootElement = document.createElement("app-root");
	targetElement!.append(appRootElement);
	platformBrowserDynamic([])
		.bootstrapModule(AppModule, {})
		.catch(err => console.error(err));
}
