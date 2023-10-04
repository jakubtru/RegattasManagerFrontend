import {Component, OnInit} from '@angular/core';
import {Regatta} from "../regatta";
import {Team} from "../team";
import {ApiService} from "../api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {faLocationDot, faLocationPinLock} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-regatta',
  templateUrl: './regatta.component.html',
  styleUrls: ['./regatta.component.css']
})
export class RegattaComponent implements OnInit{
  title = 'RegattasManager';
  public regattas: Regatta[]  = [];
  public teams: Team[]  = [];

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
        console.log(response)
        this.regattas = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  public getTeams(): void {
    this.apiService.getTeams().subscribe(
      (response: Team[]) => {
        console.log(response)
        this.teams = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  public searchRegatta(key: string): void {
    const results: Regatta[] = [];
    console.log(key);
    for (const regatta of this.regattas!) {
      if (regatta.regattaName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(regatta);
      }
    }
    this.regattas = results;
    if (results.length === 0 || !key) {
      this.getRegattas();
    }
  }

  protected readonly faLocationPinLock = faLocationPinLock;
  protected readonly faLocationDot = faLocationDot;
}
