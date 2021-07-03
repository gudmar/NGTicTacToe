import { Injectable } from '@angular/core';
import { Receiver} from '../app.types'

@Injectable({
  providedIn: 'root'
})
export class MediatorService {

  subscribersCallbacks: Receiver[] = [];
  constructor(){}

  subscribe(receiverFunction: Receiver){
    this.subscribersCallbacks.push(receiverFunction)
  }

  sendMessageToAllSubscribers(message: string){
    for(let receiverFunction of this.subscribersCallbacks){
      receiverFunction(message)
    }
  }
}