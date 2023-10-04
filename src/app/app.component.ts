import { Component } from '@angular/core';
import {Regatta} from "./regatta";
import {ApiService} from "./api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Team} from "./team";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RegattasManager';
  public regattas: Regatta[] | undefined;
  public teams: Team[] | undefined;

  constructor(private apiService: ApiService) {
    this.getRegattas()
    this.getTeams()
  }

  ngOnInit(): void {
    this.getRegattas();
  }

  public getRegattas(): void {
    this.apiService.getRegattas().subscribe(
      (response: Regatta[]) => {
        console.log()
        this.regattas = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  public getTeams(): void {
    this.apiService.getTeams().subscribe(
      (response: Team[]) => {
        console.log()
        this.teams = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
}
