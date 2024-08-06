import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-college',
  standalone: true,
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css'],
  imports: [CommonModule]
})
export class CollegeComponent {
  colleges = [{ name: 'College 1', location: 'Location 1' }];

  createCollege() {
    // Logic to create a new college
  }

  deleteCollege(index: number) {
    this.colleges.splice(index, 1);
  }

  editCollege(index: number) {
    // Logic to edit an existing college
  }
}
