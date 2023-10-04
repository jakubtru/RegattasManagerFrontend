import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ApiService } from "../api.service";
import * as bcrypt from 'bcryptjs';
import { User } from "../user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  public onLogin(addForm: NgForm): void {
    this.apiService.login(addForm);
  }
}
