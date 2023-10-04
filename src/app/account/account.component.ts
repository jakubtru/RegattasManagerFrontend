import {Component, OnInit} from '@angular/core';
import {Regatta} from "../regatta";
import {Team} from "../team";
import {ApiService} from "../api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../user";
import {BehaviorSubject, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
    public regattas: Regatta[]  = [];
    public user: Observable<User> | undefined;
    public userId: number = 0;
    public boatClasses: string = "";
    public newRegatta: Regatta | undefined;

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.apiService.loggedUserId.subscribe((id: number) => {
            this.userId = id
        });
        console.log(this.apiService.loggedUserId.getValue())
        console.log("x:" + this.apiService.x )
        console.log("email:" + this.apiService.email )
        this.getRegattas();
        this.getUser();
    }

    onCreateRegatta(addForm: NgForm): void {
        this.newRegatta = addForm.value;
         // @ts-ignore
      this.newRegatta.boatClasses = this.newRegatta?.boatClasses.split(',').map(classString => classString.trim());

        // @ts-ignore
        //this.newRegatta.user = this.apiService.getUser(this.userId);
        // Send a request to create the new Regatta
        this.apiService.addRegattaWithUserId(this.newRegatta, this.userId).subscribe(
            (response: Regatta) => {
                console.log("New Regatta created:", response);
                // Optionally, update the list of regattas after creating a new one
                this.getRegattas();
            },
            (error: HttpErrorResponse) => {
                alert("Error creating new Regatta: " + error.message);
            }
        );
        console.log(this.newRegatta)
    }

    public getRegattas(): void {
        this.apiService.getUserRegattas(this.userId).subscribe(
            (response: any) => {
                console.log(this.apiService.loggedUserId.getValue());
                console.log(response)
                this.regattas = response;
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            });
    }

    public getUser() :void {
        this.user = this.apiService.getUser(this.userId);
    }

    logout(): void {
        this.apiService.logout();

        window.location.href = '/login';
    }

    protected readonly faLocationDot = faLocationDot;

    public onOpenModal(mode: string): void {
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (mode === 'add') {
            button.setAttribute('data-target', '#createRegattaModal');
        }

        // @ts-ignore
        container.appendChild(button);
        button.click();
    }
}
