import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {FooterComponent} from "./footer/footer.component";
import {RegattaComponent} from "./regatta/regatta.component";
import {RegattaInfoComponent} from "./regatta-info/regatta-info.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {RegattaManagementComponent} from "./regatta-management/regatta-management.component";
import {RegattaStatisticsComponent} from "./regatta-statistics/regatta-statistics.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AccountComponent} from "./account/account.component";


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'regatta',
    component: RegattaComponent,
  },
  {
    path: 'regatta/:id',
    component: RegattaInfoComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'manageRegatta/:id',
    component: RegattaManagementComponent
  },
  {
    path: 'regattaStatistics/:id',
    component: RegattaStatisticsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
