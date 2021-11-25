import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookslotComponent} from './bookslot/bookslot.component'
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SlotComponent } from './slot/slot.component';
import { AuthGuard } from './auth-gaurd';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { UpdateComponent } from './update/update.component';
import { LeavesComponent } from './leaves/leaves.component';
import { DayComponent } from './day/day.component';
import { AddFacultyComponent } from './add-faculty/add-faculty.component';
import { AdminLeaveDatesComponent } from './admin-leave-dates/admin-leave-dates.component';
import { OneHourLeaveComponent } from './one-hour-leave/one-hour-leave.component';
import { AdminOneHourLeaveComponent } from './admin-one-hour-leave/admin-one-hour-leave.component';
const routes: Routes = [
  { path:'' , pathMatch:'full', redirectTo:'Login'},
  { path:'BookSlot' , component: BookslotComponent,  canActivate:[AuthGuard]},
  { path:'UpcomingLeave', component: SlotComponent, canActivate:[AuthGuard]},
  { path:'RequestLeave', component: BookslotComponent, canActivate:[AuthGuard]},
  { path:'Profile', component: ProfileComponent, canActivate:[AuthGuard]},
  { path:'Login', component:LoginComponent},
  { path:'Admin/Profile', component:AdminProfileComponent, canActivate:[AuthGuard]},
  { path:'Update', component:UpdateComponent, canActivate:[AuthGuard]},
  { path:'RegisteredLeaves', component:LeavesComponent, canActivate:[AuthGuard]},
  {path: 'day', component: DayComponent, canActivate:[AuthGuard]},
  {path: 'adminLeaveDates', component: AdminLeaveDatesComponent, canActivate:[AuthGuard]},
  {path: 'AddFaculty', component: AddFacultyComponent, canActivate:[AuthGuard]},
  {path: 'oneHourLeave', component: OneHourLeaveComponent, canActivate:[AuthGuard]},
  {path:'adimOneHourLeave', component: AdminOneHourLeaveComponent, canActivate:[AuthGuard]},
  // { path:'one', component:UpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
