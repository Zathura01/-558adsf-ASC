import { Component, effect } from '@angular/core';
import { CoreModules } from '../../services/CoreModules';
import { UserEvent } from '../../services/user-event';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// --- Interfaces should go ABOVE the decorator ---
interface EventItem {
  _id: string,
  title: string;
  location: string;
  date: string | Date;
  time: string;
  capacity: number;
  description: string;
  images: string[];
  video?: string;
}

@Component({
  selector: 'app-event-page',
  imports: [CoreModules, CommonModule],
  templateUrl: './event-page.html',
  styleUrls: ['./event-page.css']
})
export class EventPage {

  eventData: {
    upcomingEvents: EventItem[],
    completedEvents: EventItem[]
  } = {
    upcomingEvents: [],
    completedEvents: []
  };

  constructor(
    public eventService: UserEvent,
    public http: HttpClient,
    public router: Router
  ) {
    effect(() => {
      this.eventService.updateSignalOnNewEventAddition();
      this.getDataForWall();
    });
  }

  getDataForWall() {
    this.http.get<{ upcomingEvents: EventItem[], completedEvents: EventItem[] }>(
      'http://localhost:2500/getEvents/getWallData'
    ).subscribe({
      next: (res) => {
        this.eventData.upcomingEvents = res.upcomingEvents;
        this.eventData.completedEvents = res.completedEvents.slice(0, 4); 
        console.log(this.eventData);
      },
      error: (er) => {
        console.log(er);
      }
    });
  }

  handleBookEvent(id: any){
      this.router.navigate(['openEvent', id])
  }

}
