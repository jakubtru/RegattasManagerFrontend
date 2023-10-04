import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Team} from "../team";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../api.service";
import {Regatta} from "../regatta";
import {NgForm} from "@angular/forms";
import {
  faCalendarDays,
  faCoffee,
  faFileText, faLocationDot,
  faLocationPin,
  faLocationPinLock, faMoneyBill,
  faTags
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-regatta-info',
  templateUrl: './regatta-info.component.html',
  styleUrls: ['./regatta-info.component.css']
})
export class RegattaInfoComponent implements OnInit{
  public teams: Team[] = [];
  public regattaId: string | null | undefined;
  public regatta: Regatta | undefined;
  public pointsArray: number[] = [0, 0, 0, 0];
  public pointsArrayJSON: string = JSON.stringify(this.pointsArray);

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.regattaId = params.get('id');
      console.log(this.regattaId);
      this.getTeams();
      this.getRegatta();
    });
  }

  public getTeams(): void {
    this.apiService.getRegattaTeams(this.regattaId).subscribe(
      (response: Team[]) => {
        console.log()
        this.teams = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  public onAddTeam(addForm: NgForm) {
    document.getElementById('close-button')?.click();
    this.apiService.addTeam(addForm.value, this.regattaId).subscribe(
      (response: Team) => {
        console.log(response);
        this.getTeams();
        addForm.reset();
        const modalCloseButton = document.getElementById('close-button');
        if (modalCloseButton) {
          modalCloseButton.click();
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getRegatta(): void {
    this.apiService.getRegatta(this.regattaId).subscribe(
      (response: Regatta) => {
        console.log()
        this.regatta = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  protected readonly faCoffee = faCoffee;
  protected readonly faCalendarDays = faCalendarDays;
  protected readonly faLocationPin = faLocationPin;
  protected readonly faTags = faTags;
  protected readonly faLocationPinLock = faLocationPinLock;
  protected readonly faFileText = faFileText;
  protected readonly faLocationDot = faLocationDot;
  protected readonly faMoneyBill = faMoneyBill;
}
