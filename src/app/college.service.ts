import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  private apiUrl = 'http://localhost:3000'; // Your backend API endpoint

  constructor(private http: HttpClient) { }

  getColleges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Allcolleges`);
  }

  deleteCollege(collegeName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Deletecollege/${collegeName}`);
  }

  registerCollege(collegeData: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/registerCollege`, collegeData);
  }

  // Add this method for updating a college
  
  updateCollege(originalCollegeName: string, updatedCollege: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Updatecollege/${encodeURIComponent(originalCollegeName)}`, updatedCollege);
  }
  
}
