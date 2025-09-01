import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserActivity } from '../../services/user-activity';
import { CoreModules } from '../../services/CoreModules';
import { Router } from '@angular/router';
import { UserEvent } from '../../services/user-event';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule, CoreModules],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  eventLocation = ''

  constructor(public userActivity: UserActivity, private router: Router, public newUserEvent: UserEvent){}

  navigateToHome(){
    this.router.navigate([''])
  }

  handleCreateEvent(){
    this.userActivity.userFormClicked = !this.userActivity.userFormClicked 
    this.userActivity.showOtpBtnOnForm = true
  }

  handleReset(){
       this.eventLocation = ''
  }
  handleSubmit(){
      console.log(this.eventLocation)
  }

  handleUpcomingEvents(){

  }
  handleFinishedEvents(){

  }
  handleNewEvent(){
    this.newUserEvent.showNewEventForm = !this.newUserEvent.showNewEventForm
  }
  handleLogout(){
     this.userActivity.isUserLoggedIn = false
     this.userActivity.jwtToken = null
     this.userActivity.showOtpBtnOnForm = true
     this.router.navigate([''])
     
  }

}
