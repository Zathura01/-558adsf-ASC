import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserActivity {
  
  userFormClicked: boolean = false;
  showOtpBtnOnForm = true;
  isUserLoggedIn : boolean = false;
  jwtToken: any = null
  userId: any = null

}
