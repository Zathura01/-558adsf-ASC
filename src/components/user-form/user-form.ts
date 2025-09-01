import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserActivity } from '../../services/user-activity';
import { HttpClient } from '@angular/common/http';
import { CoreModules } from '../../services/CoreModules';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,  // add this if using Angular standalone components
  imports: [FormsModule, CommonModule, CoreModules],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class UserForm {

  isLoginForm = true;

  dataLogin = {
    username: "",
    password: "",
    otp: ""
  }

  dataRegister = {
    username: "",
    password: "",
    confirmpassword: "",
    email: "",
    cellphone: "",
    otp: ""
  }

  constructor(public userActivity: UserActivity,
    public http: HttpClient,
    public router: Router
  ) { }

  toggleForm() {
    this.isLoginForm = !this.isLoginForm;
  }

  handleLoginOtp() {
    const data = {
      username: this.dataLogin.username,
      password: this.dataLogin.password
    }
    this.http.get('http://localhost:2500/userActivity/sendLoginOtp', {
      params: {
        username: data.username,
        password: data.password
      }
    }).subscribe({
      next: (res: any) => {
        console.log(res.mgs, res.otp, " userForm.ts ")
        if (res.otp) {
          this.userActivity.showOtpBtnOnForm = false;
        }
      },
      error: (err) => {
        console.log(" ", err, " ")
      }
    })
  }

  handleLogin() {


    this.http.get('http://localhost:2500/userActivity/login', {
      params: {
        otp: this.dataLogin.otp,
        username: this.dataLogin.username
      }
    })
      .subscribe({
        next: (res: any) => {
          console.log(res.mgs, " USER STATUS")
          if (res.mgs !== 'Invalid OTP' && res.token) {
            // Save JWT in your service
            this.userActivity.jwtToken = res.token;
            this.userActivity.userId = res.userId;
            this.userActivity.userFormClicked = false;
            this.userActivity.showOtpBtnOnForm = true;
            this.userActivity.isUserLoggedIn = true;
            this.dataLogin = {
              username: "",
              password: "",
              otp: ""
            }
            this.router.navigate(['/dashboard'])
          }
        },
        error: (err) => {
          console.log(err)
        }
      })

  }

  handleRegisterOtp() {
    this.http.get('http://localhost:2500/userActivity/sendRegisterOtp', { params: { phonenumber: this.dataRegister.cellphone } })
      .subscribe({
        next: (res: any) => {
          console.log(res.mgs)
          this.userActivity.showOtpBtnOnForm = false
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  handleRegister() {

    console.log("Register data:", this.dataRegister);
    this.http.post('http://localhost:2500/userActivity/register', this.dataRegister)
      .subscribe({
        next: (res: any) => {
          console.log(res.mgs)
          this.userActivity.showOtpBtnOnForm = true
          this.isLoginForm = true

          this.dataRegister = {
            username: "",
            password: "",
            confirmpassword: "",
            email: "",
            cellphone: "",
            otp: ""
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
  }
}
