import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { OneHourLeaveService } from '../one-hour-leave/one-hour-leave.service';
import { RegectDialogComponent } from './regect-dialog/regect-dialog.component';

@Component({
  selector: 'app-admin-one-hour-leave',
  templateUrl: './admin-one-hour-leave.component.html',
  styleUrls: ['./admin-one-hour-leave.component.css']
})
export class AdminOneHourLeaveComponent implements OnInit {
  isLoading = true;;
  form: FormGroup;
  leaves;
  date = new Date();
  constructor(private oneHourLeaveService: OneHourLeaveService,public dialog: MatDialog) { }

  ngOnInit(): void {
    const date = new Date;
    this.form = new FormGroup({
      'date': new FormControl(date,[Validators.required])
    });
    this.oneHourLeaveService.getLeavesOnDate(date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()).subscribe(result => {
      console.log(result);
      this.leaves = result.leaves;
      this.isLoading = false
    });
  }
  check() {
    this.isLoading = true;
    this.date = this.form.value.date;
    this.oneHourLeaveService.getLeavesOnDate(this.date.getDate() + '/' + (this.date.getMonth()+1) + '/' + this.date.getFullYear()).subscribe(result => {
      console.log(result);
      this.leaves = result.leaves;
      this.isLoading = false;
    });
  }

  accept(leaveId, faculty) {
     console.log(faculty);
    if(faculty.acceptedHalfDayLeaves==2){
        this.dialog.open(DialogComponent, {
         width: '700px',
         data: { }
       });
       return;
    }
    this.isLoading = true;
    this.oneHourLeaveService.acceptLeave(leaveId).subscribe(result => {
      console.log(result);
      const leaves = this.leaves;
        const leaveIndex = leaves.findIndex(leave => leave._id == leaveId);
        const updatedLeave = leaves[leaveIndex];
        if(updatedLeave.status!= 'Accepted') {
          updatedLeave.status = 'Accepted';
          leaves[leaveIndex] = updatedLeave;
        }
        this.oneHourLeaveService.getLeavesOnDate(this.date.getDate() + '/' + (this.date.getMonth()+1) + '/' + this.date.getFullYear()).subscribe(result => {
          console.log(result);
          this.leaves = result.leaves;
          this.isLoading = false;
        });
    })
  }
  checkDate(leaveDate: string) {
      const date = new Date();
      if(leaveDate == date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()) {
        return true;
      }
      else
        return false;
  }

  reject(leaveId) {
    const modalRef =  this.dialog.open(RegectDialogComponent , {
      width: '700px',
      data: { leaveId: leaveId}
    });
    modalRef.componentInstance.passEntry.subscribe((res) => {
      if(res.reject == false)
        return;
      if(res.isLoading == true) {
        this.isLoading = true;
        const leaves = this.leaves;
            const leaveIndex = leaves.findIndex(leave => leave._id == leaveId);
            const updatedLeave = leaves[leaveIndex];
            updatedLeave.status = 'Rejected';
            leaves[leaveIndex] = updatedLeave;
      }
      else {
        this.oneHourLeaveService.getLeavesOnDate(this.date.getDate() + '/' + (this.date.getMonth()+1) + '/' + this.date.getFullYear()).subscribe(result => {
          console.log(result);
          this.leaves = result.leaves;
          this.isLoading = false;
        });
      }
  });
  }
}
