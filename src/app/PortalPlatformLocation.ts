import {BrowserPlatformLocation, LocationChangeListener} from "@angular/common";
import * as H from "history";

//TODO: wenn alle Methoden überschrieben wurden, kann "extends BrowserPlatformLocation" zu "extends PlatformLocation" werden.
export class PortalPlatformLocation extends BrowserPlatformLocation {

  historyImpl:H.History;

  constructor(doc: any, history: H.History) {
    super(doc);
    this.historyImpl = history;
  }


  override onPopState(fn: LocationChangeListener): VoidFunction {
    console.log("onPopState", fn);
    return this.historyImpl.listen((listener) => {
      //fn({type: event, state: loc}) TODO: wie übersetzt man die Parameter korrekt?
      console.log("onPopState listener for ", listener)
    })
    //return super.onPopState(fn);
  }

  override pushState(state: any, title: string, url: string) {
    console.log("PUSH", state, title, url);
    this.historyImpl.push(url, state)
    //super.pushState(state, title, url);
  }


  override replaceState(state: any, title: string, url: string) {
    console.log("REPLACE", state, title, url);
    this.historyImpl.replace(url, state)
    //super.replaceState(state, title, url);
  }

  override forward() {
    console.log("forward");
    this.historyImpl.go(1);
    //super.forward();
  }

  override back() {
    console.log("back");
    this.historyImpl.go(-1);
    //super.back();
  }

  override historyGo(relativePosition?: number) {
    console.log("historyGo", relativePosition);
    this.historyImpl.go(relativePosition??0)
    //super.historyGo(relativePosition);
  }


  override get pathname(): string {
    return this.historyImpl.location.pathname
  }

  override set pathname(newPath: string) {
    this.historyImpl.location.pathname = newPath;
  }


  override get search(): string {
    return this.historyImpl.location.search;
  }

  override get hash(): string {
    return this.historyImpl.location.hash;
  }

  override getState(): unknown {
    return this.historyImpl.location.state
  }



//TODO: override all other getter base on window.location with data from this.historyImpl.location (Q: what should we use for href inside a srcdoc iframe?)
}
