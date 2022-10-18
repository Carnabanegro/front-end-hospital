import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { UsersComponent } from './users/users.component';
import { DoctorsComponent } from './doctors/doctors.component';
//import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';



const routes: Routes = [
    {path: 'dashboard' , component: PagesComponent,
    canActivate: [AuthGuard]
    ,children:[
        //{path: '', component:DashboardComponent},
        {path: 'doctors', component:DoctorsComponent},
        {path: 'users', component:UsersComponent},
        {path: 'hospitals', component:HospitalsComponent},
        {path: 'profile', component:ProfileComponent},
        
    ]},
    

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}