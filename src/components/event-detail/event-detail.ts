import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { CoreModules } from '../../services/CoreModules';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.html',
    imports: [CoreModules, Navbar],
  styleUrls: ['./event-detail.css']
})
export class EventDetail implements OnInit, OnDestroy {


  eventId: string | null = null;
  eventDetails: any = {};
  capacity: number = 0;
  socket!: Socket;

  constructor(
    private router: ActivatedRoute,
    private http: HttpClient
  ) {
    this.eventId = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getEventDetails();

    // Connect to socket
    this.socket = io('http://localhost:2500');
    if (this.eventId) {
      this.socket.emit('joinEventRoom', this.eventId);
      this.socket.on('seatUpdated', (data: any) => {
        this.capacity = data.capacity;
      });
    }
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }

  getEventDetails() {
    if (!this.eventId) return;
    this.http.get<any>(`http://localhost:2500/getEvents/getEventDetails?eventId=${this.eventId}`)
      .subscribe(res => {
        this.eventDetails = res;
        this.capacity = res.capacity;
      }, err => console.log(err));
  }

  book() {
    if (!this.eventId) return;
    this.http.post(`http://localhost:2500/getEvents/bookEvent/${this.eventId}`, {})
      .subscribe({
        next: (res: any)=>{
          this.capacity = res.capacity
          console.log(res)
        },
        error: (err)=>{
          console.log(err)
        }
      });
  }
}
