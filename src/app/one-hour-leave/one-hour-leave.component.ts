import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../login/login.service';
import { OneHourLeaveService } from './one-hour-leave.service';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-one-hour-leave',
  templateUrl: './one-hour-leave.component.html',
  styleUrls: ['./one-hour-leave.component.css']
})
export class OneHourLeaveComponent implements OnInit {
  form: FormGroup;
  constructor(private oneHourLeaveService: OneHourLeaveService, private authService: LoginService, private dialog: MatDialog) { }
  isLoading = true;
  time;
  userId;
  faculty;
  leaves;
  isExceeded=false;
  ngOnInit(): void {
    this.form = new FormGroup({
      'from': new FormControl(null,[Validators.required]),
      'to': new FormControl(null,[Validators.required]),
      'reason': new FormControl(null, [Validators.required]),
    });
    this.userId = this.authService.getUserId();
    this.oneHourLeaveService.getFacultyDeatails(this.userId).subscribe(result => {
      this.leaves = result.faculty.halfdayleaves;
      this.faculty = result.faculty;
      console.log(this.leaves,result);
      if(result.faculty.acceptedHalfDayLeaves == 2) {
        this.isExceeded = true;
      }
      this.isLoading = false;
    });
  }
  submit(){
    const date = new Date();
    this.isLoading = true;
    this.oneHourLeaveService.oneHour(date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear(),this.form.value.from, this.form.value.to, this.userId, this.form.value.reason).subscribe(res => {
      this.openDialog(true, '');
      this.oneHourLeaveService.getFacultyDeatails(this.userId).subscribe(result => {
        this.leaves = result.faculty.halfdayleaves;
        console.log(this.leaves,result);
        if(result.faculty.acceptedHalfDayLeaves == 2) {
          this.isExceeded = true;
        }
        this.isLoading = false;
      });
    })
  }

  openDialog(sucess: boolean, reason: string) {
    this.dialog.open(DialogComponent,{
      disableClose: true,
      data :{'sucess': sucess, reason: reason}
    });
  }
}
