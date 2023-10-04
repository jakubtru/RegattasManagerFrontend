import {Team} from "../team";
import {Regatta} from "../regatta";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {faCalendarDays, faFileText, faLocationDot, faMoneyBill, faTags} from "@fortawesome/free-solid-svg-icons";
import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-regatta-management',
  templateUrl: './regatta-management.component.html',
  styleUrls: ['./regatta-management.component.css']
})
export class RegattaManagementComponent {
  public teams: Team[] = [];
  public regattaId: string | null | undefined;
  public regatta: Regatta | undefined;
  private editRegatta: Regatta | null | undefined;
  public selectedTeam: Team | null = null;
  public pointsToAdd: number | null = null;
  public boatClasses: string = "";
  public updateRegatta: Regatta | undefined;
  private dialogRef: MatDialogRef<RegattaManagementComponent> | undefined
  @ViewChild('addPointsModal') addPointsModal: ElementRef | undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private renderer: Renderer2, public dialog: MatDialog) {
  }



  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.regattaId = params.get('id');
      console.log(this.regattaId); // This will log the value of the 'id' route parameter
      this.getTeams();
      this.getRegatta();
    });
  }

  public onOpenModal(team: Team | null | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTeamModal');
    }

    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public onOpenRegattaModal(regatta: Regatta | null | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editRegatta = regatta;
      button.setAttribute('data-target', '#updateRegattaModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
  public updateBoatClasses(): void {
    // @ts-ignore
      this.regatta.boatClasses = this.boatClasses.split(',').map((classString) => classString.trim());
  }

    public onUpdateRegatta(regatta: Regatta | undefined) {
        if (regatta) {
            // Convert boatClasses from a comma-separated string to an array

          regatta.boatClasses = regatta.boatClasses[0].split(',').map(classString => classString.trim());
            // @ts-ignore
            regatta.id = this.regattaId;
            // @ts-ignore

            this.apiService.updateRegattaWithUserId(regatta, this.apiService.loggedUserId.getValue()).subscribe(
                (response: Regatta) => {
                    console.log(response);
                    this.getRegatta();
                    // @ts-ignore
                    //this.dialogRef.close();
                },
                (error: HttpErrorResponse) => {
                    alert(error.message);
                }
            );
        } else {
            console.error('Invalid regatta data:', regatta);
        }
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

  public onDeleteRegatta(regatta: Regatta | undefined): void {
    if (regatta) {
      if (confirm("Are you sure you want to delete this regatta?")) {
        this.apiService.deleteRegatta(regatta.id).subscribe(
          () => {
            console.log("Regatta deleted successfully.");
            window.location.href = "/account";
          },
          (error: HttpErrorResponse) => {
            console.error("Error deleting regatta: ", error.message);
          }
        );
      }
    }
  }

  protected readonly faCalendarDays = faCalendarDays;
  protected readonly faLocationDot = faLocationDot;
  protected readonly faTags = faTags;
  protected readonly faMoneyBill = faMoneyBill;
  protected readonly faFileText = faFileText;

  onDeleteTeam(team: Team) {
    if (team) {
      if (confirm("Are you sure you want to delete this regatta?")) {
        this.apiService.deleteTeam(team.id).subscribe(
            () => {
              console.log("Team deleted successfully.");
              window.location.href = "/manageRegatta/" + this.regattaId;
            },
            (error: HttpErrorResponse) => {
              console.error("Error deleting team: ", error.message);
            }
        );
      }
    }
  }

  onNoClick() {

  }

  updatePoints(team: Team) {
    this.apiService.updateTeam(team).subscribe(
        (response: Team) => {
          console.log(response);
          this.getTeams();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    )

  }
}
