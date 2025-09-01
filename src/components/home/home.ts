import { Component } from '@angular/core';
import {Navbar} from '../navbar/navbar'
import { EventPage } from '../event-page/event-page';
import { Results } from '../results/results';

@Component({
  selector: 'app-home',
  imports: [Navbar, EventPage, Results],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
