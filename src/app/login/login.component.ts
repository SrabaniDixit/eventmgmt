import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    // Check for admin login
    if (this.username === 'admin' && this.password === 'admin123') {
      localStorage.setItem('user', 'admin');
      this.router.navigate(['/home']);
    } 
    // Check for individual SME logins
    else if (this.username === 'SME1' && this.password === 'sme1231') {
      localStorage.setItem('user', 'SME1');
      this.router.navigate(['/home']);
    } 
    else if (this.username === 'SME2' && this.password === 'sme1232') {
      localStorage.setItem('user', 'SME2');
      this.router.navigate(['/home']);
    } 
    else if (this.username === 'SME3' && this.password === 'sme1233') {
      localStorage.setItem('user', 'SME3');
      this.router.navigate(['/home']);
    } 
    else if (this.username === 'SME4' && this.password === 'sme1234') {
      localStorage.setItem('user', 'SME4');
      this.router.navigate(['/home']);
    } 
    else {
      this.errorMessage = 'Invalid credentials';
    }
  }
}
