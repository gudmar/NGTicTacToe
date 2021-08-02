import { Injectable } from '@angular/core';
import { Receiver, InitialState, FigureNotEmpty, Oponent} from './app.types'

@Injectable({
  providedIn: 'root'
})
export class GetDataFromInintialStateService {
  _data: InitialState = this.getEmptyInitialState();
  constructor(initialData: InitialState) {
    this.data = initialData;
  }

  set data(initialData: InitialState){this._data = initialData;}
  get data() {return this._data}

  get nextFigure() {return this.data.nextFigure}
  get humansFigure() {return this.data.humansFigure}
  get defaultOponent() {return this.data.defaultOponent}
  get nrOfSupportedGames() {return this.data.supportedGames.length}
  get initialGameName() {return this.data.initialGameName}
  get initialGameData() {return this.getGameData(this.initialGameName)}
  get supportedGames() {return this.data.supportedGames};

  getGameData(gameName: string){
    let isInitialName = function(element: any) {
      if (element.name == gameName) return true;
      return false
    }
    return this.data.supportedGames.findIndex(isInitialName)
  }

  getEmptyInitialState() {
    return {
      nextFigure: <FigureNotEmpty>"Circle",
      humansFigure: <FigureNotEmpty>"Circle",
      defaultOponent: <Oponent>"Computer",
      supportedGames: [{name: '', boardSize: 0, nrOfFiguresInRowToWinn: 0}],
      initialGameName: ""
    }
  }
}
