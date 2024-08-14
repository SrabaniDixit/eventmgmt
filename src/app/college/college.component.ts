import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CollegeService } from '../college.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CollegeComponent implements OnInit {
  colleges: any[] = [];
  activeTab: string = 'college';
  showCreateForm: boolean = false;
  newCollege: any = {
    CollegeName: '',
    Address: '',
    Phone: ''
  };
  isEditMode: boolean = false; // Flag to toggle between add and edit modes
  originalCollegeName: string = ''; // To hold the original name for editing

  constructor(private collegeService: CollegeService, private router: Router) {}

  ngOnInit(): void {
    this.getColleges();
  }

  getColleges(): void {
    this.collegeService.getColleges().subscribe((data) => {
      this.colleges = data;
    });
  }

  navigateTo(tab: string): void {
    this.activeTab = tab;
    this.router.navigate([`/${tab}`]);
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.resetForm();
    }
  }

  registerOrUpdateCollege(): void {
    if (this.isEditMode) {
      this.updateCollege();
    } else {
      this.registerCollege();
    }
  }

  registerCollege(): void {
    this.collegeService.registerCollege(this.newCollege).subscribe(
      () => {
        this.getColleges();
        this.toggleCreateForm();
      },
      (error) => {
        console.error('Error registering college:', error);
      }
    );
  }

  editCollege(college: any): void {
    this.isEditMode = true;
    this.originalCollegeName = college.CollegeName; // Store the original college name
    this.newCollege = { ...college }; // Populate the form with the college data
    this.showCreateForm = true; // Show the form for editing
  }

  updateCollege(): void {
    this.collegeService.updateCollege(this.originalCollegeName, this.newCollege).subscribe(
      () => {
        this.getColleges(); // Refresh the list after update
        this.toggleCreateForm(); // Hide the form after successful update
      },
      (error) => {
        console.error('Error updating college:', error);
      }
    );
  }

  deleteCollege(collegeName: string): void {
    if (confirm('Are you sure you want to delete this college?')) {
      this.collegeService.deleteCollege(collegeName).subscribe(() => {
        this.getColleges();
      }, error => {
        console.error('Error deleting college:', error);
      });
    }
  }

  resetForm(): void {
    this.newCollege = {
      CollegeName: '',
      Address: '',
      Phone: ''
    };
    this.isEditMode = false;
    this.originalCollegeName = '';
  }
  logout(): void {
    localStorage.removeItem('user'); // Clear the user information from local storage
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
