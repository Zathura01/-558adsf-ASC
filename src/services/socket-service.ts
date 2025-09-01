import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client'


@Injectable({
  providedIn: 'root'
})
export class SocketService {
   
  private socket: Socket;

  constructor(
    
  ){
     this.socket = io('http://localhost:2500')
  }

  emit(event: string, data: any){
    this.socket.emit(event, data)
  }

  on(event: string, callback: (data: any)=> void){
    this.socket.on(event, callback)
  }

  disconnect(){
    this.socket.disconnect()
  }
  
}
