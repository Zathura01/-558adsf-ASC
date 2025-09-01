import { Component, effect } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { NewEventForm } from '../new-event-form/new-event-form';
import { UserEvent } from '../../services/user-event';
import { CoreModules } from '../../services/CoreModules';
import { UserActivity } from '../../services/user-activity';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-home',
  imports: [Navbar, CoreModules, NewEventForm],
  templateUrl: './user-home.html',
  styleUrl: './user-home.css'
})
export class UserHome {

  constructor(public newuserevent: UserEvent, public userActivity: UserActivity, public http: HttpClient){
  effect(()=>{
    this.newuserevent.updateSignalOnNewEventAddition()
    this.getWallData()
  })
  }



  wallData : any | null = null


  getWallData(){
    this.http.get('http://localhost:2500/getData/userHome',{params:{
      userId: this.userActivity.userId,
      token: this.userActivity.jwtToken
    }}).subscribe({
      next:(res)=>{
          this.wallData = res
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }



}
