import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Event {
  name: string;
  assignedTo: string;
  status: string;
  date: string;
  college: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule]
})
export class HomeComponent {
  events: Event[] = [
    { name: 'Event 1', assignedTo: 'SME 1', status: 'Pending', date: '2024-08-01', college: 'College 1' },
    { name: 'Event 2', assignedTo: 'SME 2', status: 'Completed', date: '2024-08-02', college: 'College 2' }
  ];

  constructor(private router: Router) {}

  editEvent(event: Event) {
    // Navigate to edit event page
    console.log('Edit event', event);
  }

  deleteEvent(event: Event) {
    // Delete event logic
    console.log('Delete event', event);
  }

  createEvent() {
    // Navigate to create event page
    console.log('Create event');
  }
}
