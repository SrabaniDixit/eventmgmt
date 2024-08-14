import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Event {
  Event: string;
  AssignedTo: string;
  Status: string;
  Date: string;
  College: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Get all events
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/Allevents`);
  }
  getColleges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Allcolleges`);
  }
  // Register a new event
  registerEvent(eventData: Event): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerEvent`, eventData);
  }

  // Update an existing event
  updateEvent(eventName: string, updatedEventData: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/Updateevent/${eventName}`, updatedEventData);
  }

  // Delete an event by name
  deleteEvent(eventName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Deleteevent/${eventName}`);
  }
}
