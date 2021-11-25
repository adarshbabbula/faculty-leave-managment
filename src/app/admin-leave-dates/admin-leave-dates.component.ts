import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DayService } from '../day/day.service';
import { DialogComponent } from './dialog/dialog.component';
import { RejectDialogComponent } from './reject-dialog/reject-dialog.component';
@Component({
  selector: 'app-admin-leave-dates',
  templateUrl: './admin-leave-dates.component.html',
  styleUrls: ['./admin-leave-dates.component.css']
})
export class AdminLeaveDatesComponent implements OnInit {
  form: FormGroup;
  leaves: any;
  isLoading = false;
  date;
  isDateFetched=false;
  constructor(private dayService: DayService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'date': new FormControl(null,[Validators.required])
    });
  }

  check() {
    this.isLoading = true;
    console.log(this.form.value.date.getDate() + '/' + (this.form.value.date.getMonth()+1) + '/' + this.form.value.date.getFullYear());
    this.dayService.getLeavesOnDay(this.form.value.date.getDate() + '/' + (this.form.value.date.getMonth()+1) + '/' + this.form.value.date.getFullYear()).subscribe(result => {
      this.leaves = result.leaves;
      this.isLoading = false;
    });
    this.dayService.getDateDetails(this.form.value.date.getDate() + '/' + (this.form.value.date.getMonth()+1) + '/' + this.form.value.date.getFullYear()).subscribe(result => {
      this.date = result.date;
      this.isDateFetched = true;
    })
  }

  accept(leaveId){
    // this.date.acceptedLeaves =7;
    if(this.date.acceptedLeaves == 7) {
       this.dialog.open(DialogComponent, {
        width: '700px',
        data: { }
      });
      return;
    }
    this.isLoading = true;
    this.dayService.acceptLeaeve(leaveId).subscribe(res => {
        console.log(res);
        const leaves = this.leaves;
        const leaveIndex = leaves.findIndex(leave => leave._id == leaveId);
        const updatedLeave = leaves[leaveIndex];
        if(updatedLeave.status!= 'Accepted') {
          updatedLeave.status = 'Accepted';
          leaves[leaveIndex] = updatedLeave;
          this.date.acceptedLeaves += 1;
        }
        this.isLoading = false;
    });
  }

  reject(leaveId) {
    // this.isLoading = true;
    // this.dayService.rejectLeaeve(leaveId).subscribe(res => {
    //   console.log(res);
    //   const leaves = this.leaves;
    //     const leaveIndex = leaves.findIndex(leave => leave._id == leaveId);
    //     const updatedLeave = leaves[leaveIndex];
    //     updatedLeave.status = 'Rejected';
    //     leaves[leaveIndex] = updatedLeave;
    //     if(updatedLeave.status == 'Accepted') {
    //       this.date.acceptedLeaves -= 1;
    //     }
    //     this.isLoading = false;
    // });
    const modalRef =  this.dialog.open(RejectDialogComponent, {
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
            if(updatedLeave.status == 'Accepted') {
              this.date.acceptedLeaves -= 1;
            }
            updatedLeave.status = 'Rejected';
            leaves[leaveIndex] = updatedLeave;
      }
      else {
        this.isLoading = false;
    }
  });
  }

  checkDate(date: string) {
    const str = date.split('/');
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const day = Number(str[0]);
      const currentDate = new Date();
      console.log(month, currentDate.getMonth());
      if(currentDate.getFullYear() != year)
        return currentDate.getFullYear() < year;
      if(currentDate.getMonth() != month)
        return currentDate.getMonth() < month;
      if(currentDate.getDate() != day)
        return currentDate.getDate() < day;
      return true;
  }
}
