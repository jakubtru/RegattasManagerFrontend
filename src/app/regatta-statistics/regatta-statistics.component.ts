import { Component } from '@angular/core';
import {Team} from "../team";
import {Regatta} from "../regatta";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {faCalendarDays, faFileText, faLocationDot, faMoneyBill, faTags} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-regatta-statistics',
  templateUrl: './regatta-statistics.component.html',
  styleUrls: ['./regatta-statistics.component.css']
})
export class RegattaStatisticsComponent {
  public teams: Team[] = [];
  public regattaId: string | null | undefined;
  public regatta: Regatta | undefined;
  showSortOptions = false;

  // Sorting related variables
  sortColumn: string | null = null;
  isSortReversed = false;

  toggleSortOptions() {
    this.showSortOptions = !this.showSortOptions;
  }

  sortTeams(column: string) {
    if (this.sortColumn === column) {
      this.isSortReversed = !this.isSortReversed;
    } else {
      this.isSortReversed = false;
    }
    this.sortColumn = column;

    this.teams.sort((a, b) => {
      if (column === 'yachtName') {
        const aValue = a[column];
        const bValue = b[column];

      if (aValue === bValue) return 0;

      return this.isSortReversed ? (aValue > bValue ? -1 : 1) : aValue.localeCompare(bValue);
    } else if (column === 'points') {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue === bValue) return 0;

      return this.isSortReversed ? (aValue > bValue ? -1 : 1) : aValue - bValue;
    } else if (column === 'skipper') {
        const aValue = a[column];
        const bValue = b[column];
        return this.isSortReversed ? (aValue > bValue ? -1 : 1) : aValue.localeCompare(bValue);

      } else {return 0;}
    });
  }


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

  private calculatePointsSum(points: number[]): number {
    // Calculate the sum of points for a team
    return points.reduce((sum, point) => sum + point, 0);
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


  protected readonly faCalendarDays = faCalendarDays;
  protected readonly faLocationDot = faLocationDot;
  protected readonly faTags = faTags;
  protected readonly faMoneyBill = faMoneyBill;
  protected readonly faFileText = faFileText;
}
