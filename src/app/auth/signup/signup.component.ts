import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  isLoading = false;

  constructor(private authService: AuthService ) {}

  onSignup(form: NgForm) {
    this.authService.createUser(form.value.email, form.value.password);
  }
}
