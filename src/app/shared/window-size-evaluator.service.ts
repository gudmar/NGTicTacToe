import { Injectable } from '@angular/core';
import { basename } from 'path';
import { flatten } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeEvaluatorService {
  _displayWidth: number = window.innerWidth;
  _displayHeight: number = window.innerHeight;
  set displayWidth(val: number) {this._displayWidth = val; console.log(val)}
  set displayHeight(val: number) {this._displayHeight = val; console.log(val)}
  get displayWidth() {return this._displayWidth}
  get displayHeight() {return this._displayHeight}
  constructor() { }

  isWindowBig(): boolean{
    if (this.displayHeight >= 890 && this.displayWidth >= 690) return true;
    return false;
  }
  isWindowMedium(): boolean {
    if (this.isWindowBig()) return false;
    if ((this.displayHeight >= 760) && (this.displayWidth >= 570)){
      return true;
    }
    return false;
  }
  isWIndowSmall():boolean {
    if (this.isWindowBig()) return false;
    if (this.isWindowMedium()) return false;
    if ((this.displayHeight >= 600) && (this.displayWidth >= 400)){
      return true;
    }
    return false;
  }
  isWIndowVerySmall():boolean {
    if (this.displayHeight < 600 && this.displayWidth < 400){
      return true;
    }
    return false;
  }

  getScreanSize():string{
    if (this.isWindowBig()) return "big";
    if (this.isWindowMedium()) return "medium";
    if (this.isWIndowSmall()) return "small";
    return "verySmall"
  }

  // get windowSize(): string {
  //   if (this.dispalyWidth < 690 570 400) return ;
  //   if (this.displayHeight < 890  760 600)
  //   return false
  // }

}
