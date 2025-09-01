import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from '../components/home/home';
import { UserForm } from '../components/user-form/user-form';
import { UserActivity } from '../services/user-activity';
import { CommonModule } from '@angular/common';
import { CoreModules } from '../services/CoreModules';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, UserForm, CommonModule, CoreModules],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('eventman');
  constructor(public userActivity: UserActivity){}



}
