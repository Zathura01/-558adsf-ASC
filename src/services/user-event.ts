import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserEvent {
  showNewEventForm = false;
  updateSignalOnNewEventAddition = signal<number>(0)
  notifyAdditionOfNewEventFunction(){
    this.updateSignalOnNewEventAddition.update(v=>v+1)
  }
  
}
