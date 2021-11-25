import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SlotComponent } from './slot/slot.component';
import { BookslotComponent } from './bookslot/bookslot.component';
import { AppRoutingModule } from './app-routing.module';

import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthGuard  } from './auth-gaurd';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { HourComponent } from './hour/hour.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { UpdateComponent } from './update/update.component';
import { LeavesComponent } from './leaves/leaves.component';
import { DayComponent } from './day/day.component';
import { AddFacultyComponent } from './add-faculty/add-faculty.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { WithDrawLeavesComponent } from './leaves/with-draw-leaves/with-draw-leaves.component';
import {MatSelectModule} from '@angular/material/select';
import { AdminLeaveDatesComponent } from './admin-leave-dates/admin-leave-dates.component';
import { OneHourLeaveComponent } from './one-hour-leave/one-hour-leave.component';
import { AdminOneHourLeaveComponent } from './admin-one-hour-leave/admin-one-hour-leave.component';
import { RejectDialogComponent } from './admin-leave-dates/reject-dialog/reject-dialog.component';
import { RegectDialogComponent } from './admin-one-hour-leave/regect-dialog/regect-dialog.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ChangePasswordComponent } from './admin-profile/change-password/change-password.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SlotComponent,
    BookslotComponent,
    LoginComponent,
    DialogComponent,
    AdminProfileComponent,
    HourComponent,
    UpdateComponent,
    LeavesComponent,
    DayComponent,
    AddFacultyComponent,
    WithDrawLeavesComponent,
    AdminLeaveDatesComponent,
    OneHourLeaveComponent,
    AdminOneHourLeaveComponent,
    RejectDialogComponent,
    RegectDialogComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatStepperModule,
    NgxPrintModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
