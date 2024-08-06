import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event',
  standalone: true,
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  imports: [CommonModule]
})
export class EventComponent {
  events = [{ name: 'Event 1', description: 'Description 1' }];

  createEvent() {
    // Logic to create a new event
  }

  deleteEvent(index: number) {
    this.events.splice(index, 1);
  }

  editEvent(index: number) {
    // Logic to edit an existing event
  }
}
