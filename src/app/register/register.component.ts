import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ApiService } from "../api.service";
import * as bcrypt from 'bcryptjs';
import { User } from "../user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public email: string = "";
  public password: string = "";
  public confirmPassword: string | undefined;
  private readonly saltRounds: number = 10;

  constructor(private apiService: ApiService) {}

  onRegister(registerForm: NgForm) {
    this.email = registerForm.value.email;
    this.password = registerForm.value.password;
    this.confirmPassword = registerForm.value.confirmPassword;

    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match!");
    } else {

     //temporary solution
      const salt = bcrypt.genSaltSync(this.saltRounds);
      const hashedPassword = bcrypt.hashSync(this.password, salt);


      const user = {
        email: this.email,
        password: hashedPassword
      };

      this.apiService.addUser(<User>user).subscribe(
        (responseUser) => {

          registerForm.reset();
          alert("Registration successful!");
        },
        (error) => {

          console.error("Registration failed:", error);
          alert("Registration failed!");
        }
      );
    }
  }
}


