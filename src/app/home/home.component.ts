import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { CollegeService } from '../college.service';

interface Event {
  Event: string;
  AssignedTo: string;
  Status: string;
  Date: string;
  College: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule]
})
export class HomeComponent implements OnInit {
  events: Event[] = [];
  colleges: string[] = []; // Variable to store the list of colleges
  activeTab: string = 'home';
  showCreateForm: boolean = false;
  showEditForm: boolean = false;
  originalEventName: string = '';
  newEvent: Event = {
    Event: '',
    AssignedTo: '',
    Status: '',
    Date: '',
    College: ''
  };
  currentEvent: Event = {
    Event: '',
    AssignedTo: '',
    Status: '',
    Date: '',
    College: ''
  };
  loggedInUser: string = '';
  isSME: boolean = false;

  constructor(private eventService: EventService, private collegeService: CollegeService, private router: Router) {}

  ngOnInit() {
    this.loggedInUser = localStorage.getItem('user') || '';
    this.isSME = this.loggedInUser.startsWith('SME');
    this.fetchEvents();
    this.fetchColleges(); // Fetch the list of colleges on initialization
  }

  fetchEvents() {
    this.eventService.getEvents().subscribe(
      (data: Event[]) => {
        if (this.isSME) {
          // Filter events assigned to the logged-in SME
          this.events = data.filter(event => event.AssignedTo === this.loggedInUser);
        } else {
          // Show all events for admin
          this.events = data;
        }
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }

  fetchColleges() {
    this.collegeService.getColleges().subscribe(
      (data: any[]) => {
        this.colleges = data.map(college => college.CollegeName); // Assuming you want to store only college names
      },
      (error) => {
        console.error('Error fetching colleges', error);
      }
    );
  }

  navigateToCollege() {
    if (!this.isSME) {
      this.router.navigate(['/college']);
    }
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }

  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
  }

  registerEvent() {
    this.eventService.registerEvent(this.newEvent).subscribe(
      () => {
        this.fetchEvents();
        this.showCreateForm = false;
        this.newEvent = { Event: '', AssignedTo: '', Status: '', Date: '', College: '' };
      },
      (error) => {
        console.error('Error creating event:', error);
      }
    );
  }

  editEvent(event: Event) {
    this.showEditForm = true;
    this.currentEvent = { ...event };
    this.originalEventName = event.Event;
  }

  updateEvent() {
    this.eventService.updateEvent(this.originalEventName, this.currentEvent).subscribe(
      () => {
        this.fetchEvents();
        this.showEditForm = false;
        this.currentEvent = { Event: '', AssignedTo: '', Status: '', Date: '', College: '' };
      },
      (error) => {
        console.error('Error updating event:', error);
      }
    );
  }

  deleteEvent(eventName: string) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventName).subscribe(
        () => {
          this.fetchEvents();
        },
        (error) => {
          console.error('Error deleting event', error);
        }
      );
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
