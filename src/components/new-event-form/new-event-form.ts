import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CoreModules } from '../../services/CoreModules';
import { UserEvent } from '../../services/user-event';
import { UserActivity } from '../../services/user-activity';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CoreModules],
  templateUrl: './new-event-form.html',
  styleUrl: './new-event-form.css'
})

export class NewEventForm {
  model = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: null as number | null
  };


  imageFiles: File[] = [];
  imagePreviews: string[] = [];

  videoFile: File | null = null;
  videoPreview: string | null = null;

  constructor(private http: HttpClient, public newUserEvent: UserEvent, public userActivity: UserActivity) {}

  onImagesSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.imageFiles = Array.from(input.files);
    // build previews
    this.imagePreviews.forEach(URL.revokeObjectURL);
    this.imagePreviews = this.imageFiles.map(f => URL.createObjectURL(f));
  }

  removeImage(i: number) {
    URL.revokeObjectURL(this.imagePreviews[i]);
    this.imagePreviews.splice(i, 1);
    this.imageFiles.splice(i, 1);
  }

  onVideoSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    // reset previous preview
    if (this.videoPreview) URL.revokeObjectURL(this.videoPreview);

    this.videoFile = file;
    this.videoPreview = URL.createObjectURL(file);
  }

  clearVideo() {
    if (this.videoPreview) URL.revokeObjectURL(this.videoPreview);
    this.videoPreview = null;
    this.videoFile = null;
  }

  submit(form: NgForm) {
    if (form.invalid) return;

    const fd = new FormData();
    fd.append('title', this.model.title);
    fd.append('description', this.model.description);
    fd.append('date', this.model.date);
    fd.append('time', this.model.time);
    fd.append('location', this.model.location);
    fd.append('capacity', String(this.model.capacity ?? ''));
    fd.append('createdBy', this.userActivity.userId)

    this.imageFiles.forEach((file, idx) => fd.append('image', file, file.name));
    if (this.videoFile) fd.append('video', this.videoFile, this.videoFile.name);

    
    this.http.post('http://localhost:2500/events/create', fd).subscribe({
      next: (res) => {
        console.log('Saved', res);
        form.resetForm();
        this.imageFiles = [];
        this.imagePreviews.forEach(URL.revokeObjectURL);
        this.imagePreviews = [];
        this.clearVideo();
        this.newUserEvent.showNewEventForm = false
        this.newUserEvent.notifyAdditionOfNewEventFunction()
      },
      error: (err) => console.error(err)

    });


  }


  handleFormClose(){
    this.newUserEvent.showNewEventForm = false;
  }
}
