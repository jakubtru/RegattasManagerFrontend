import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLogged: boolean = false;
  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.isLogged$.subscribe((result: boolean) => {
      this.isLogged = result
    })
  }


  redirectAccount() {
    if (this.isLogged) {
      this.router.navigate(['/account']);
    } else {
      this.router.navigate(['/login'])
    }
  }

}
