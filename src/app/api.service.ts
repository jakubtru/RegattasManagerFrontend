import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "./user";
import {Team} from "./team";
import {Regatta} from "./regatta";
import {NgForm} from "@angular/forms";
import * as bcrypt from 'bcryptjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class ApiService {


  public isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public x: number | undefined = -1;
  public email: string = "";

  private apiServerUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient, private router: Router) {
    if (window.sessionStorage.getItem('isLogged') === 'true') {
      this.isLogged$.next(true)
    } else {
      this.isLogged$.next(false)
    }
    // @ts-ignore
    this.loggedUserId.next(window.sessionStorage.getItem('sessionId'));
  }

  logout(): void {
    // Clear the session storage
    window.sessionStorage.removeItem('isLogged');

    // Reset login status and loggedUserId
    this.isLogged$.next(false);
    this.loggedUserId.next(0);
  }

  login(addForm: NgForm) {
    const email: string = addForm.value['email'];

    const password: string = addForm.value['password'];

    if (!password) {
      console.error("Password is empty.");
      return;
    }
    this.getUserByEmail(email).subscribe(

        (user: any) => {
          console.log(user['id'])
          this.email = email;

          if (!user) {
            console.error("User not found.");
            alert("Login failed!");
          } else {
            if (bcrypt.compareSync(password, user.password)) {
              alert("Login successful");
              addForm.reset();
              window.sessionStorage.setItem('isLogged', 'true');
              this.isLogged$.next(true);
              if (user.id == 0) {
                alert("user id is 000000000000");
              }
              if (user.id != null) {
                this.loggedUserId.next(user['id']!);

              }
              this.x = user['id'];

              console.log("x:" + this.x )
              console.log(user.email)
              console.log(user.password)
              console.log(user['id']);

              this.router.navigate(['/account'])
            } else {
              alert("Login failed!");
              window.sessionStorage.setItem('isLogged', 'false');
              this.isLogged$.next(false)
            }
          }
          window.sessionStorage.setItem('sessionId', user['id'].toString())
        },
        (error) => {
          console.error("Error fetching user:", error);
          alert("Login failed!");
        }
    );
  }

  /*
  public login(user: User) {
    this.httpClient.post(`${this.apiServerUrl}/login`, user).subscribe((result: any) => {
        window.sessionStorage.setItem('isLogged', 'true');
        this.isLogged$.next(true)
      },
      (error: any) => {
        window.sessionStorage.setItem('isLogged', 'false');
        this.isLogged$.next(false)
      })
  }

   */

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiServerUrl}/users`);
  }

  public getUser(userId: number | undefined): Observable<User> {
    return this.httpClient.get<User>(`${this.apiServerUrl}/users/${userId}`);
  }

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiServerUrl}/users`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiServerUrl}/users`, user);
  }


  public deleteUser(userId: number | undefined): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/users/${userId}`);
  }

  public getTeams(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(`${this.apiServerUrl}/teams`);
  }

  public getTeam(teamId: number | undefined): Observable<Team> {
    return this.httpClient.get<Team>(`${this.apiServerUrl}/teams/${teamId}`);
  }

  public getRegattaTeams(regattaId: string | null | undefined): Observable<Team[]> {
    return this.httpClient.get<Team[]>(`${this.apiServerUrl}/teams/regatta/${regattaId}`);
  }

  public addTeam(team: Team, regattaId: string | null | undefined): Observable<Team> {
    return this.httpClient.post<Team>(`${this.apiServerUrl}/teams?regattaId=${regattaId}`, team);

  }

  public updateTeam(team: Team): Observable<Team> {
    return this.httpClient.put<Team>(`${this.apiServerUrl}/teams`, team);
  }

  public deleteTeam(teamId: number | undefined): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/teams/${teamId}`);
  }

  public getRegattas(): Observable<Regatta[]> {
    return this.httpClient.get<Regatta[]>(`${this.apiServerUrl}/regattas`);
  }

  public getRegatta(regattaId: string | null | undefined): Observable<Regatta> {
    return this.httpClient.get<Regatta>(`${this.apiServerUrl}/regattas/${regattaId}`);
  }

  public addRegatta(regatta: Regatta | undefined): Observable<Regatta> {
    return this.httpClient.post<Regatta>(`${this.apiServerUrl}/regattas`, regatta);
  }

  public addRegattaWithUserId(regatta: Regatta | undefined, userId: number): Observable<Regatta> {
    return this.httpClient.post<Regatta>(`${this.apiServerUrl}/regattas/${userId}`, regatta);
  }

  public updateRegatta(regatta: Regatta | undefined): Observable<Regatta> {
    return this.httpClient.put<Regatta>(`${this.apiServerUrl}/regattas`, regatta);
  }

  public updateRegattaWithUserId(regatta: Regatta | undefined, userId : number): Observable<Regatta> {
    return this.httpClient.put<Regatta>(`${this.apiServerUrl}/regattas/${userId}`, regatta);
  }

  public deleteRegatta(regattaId: number | undefined): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/regattas/${regattaId}`);
  }

  public getUserByEmail(email: string) {
      return this.httpClient.get<User>(`${this.apiServerUrl}/users/email/${email}`);
  }

  getUserRegattas(userId: any) {
    return this.httpClient.get<any>(`${this.apiServerUrl}/regattas/user/${userId}`);
  }
}
