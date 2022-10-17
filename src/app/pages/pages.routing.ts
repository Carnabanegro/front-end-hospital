import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { UsersComponent } from './users/users.component';
import { DoctorsComponent } from './doctors/doctors.component';
//import { AccountSettingsComponent } from './account-settings/account-settings.component';



const routes: Routes = [
    {path: 'dashboard' , component: PagesComponent,children:[
        //{path: '', component:DashboardComponent},
        {path: 'doctors', component:DoctorsComponent},
        {path: 'users', component:UsersComponent},
        {path: 'hospitals', component:HospitalsComponent},
        
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