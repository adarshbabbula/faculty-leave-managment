import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../login/login.service';
import { LeaveService } from './leave.service';
import { WithDrawLeavesComponent } from './with-draw-leaves/with-draw-leaves.component';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {

  constructor(private leaveService: LeaveService, private authService: LoginService,public dialog: MatDialog) { }
  facuty;
  userId;
  leaves: any;
  isLoading= true;
  leave;
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.leaveService.getFacultyLeaves(this.userId).subscribe(result => {
      this.leaves = result.leaves;
      this.isLoading = false;
    });
  }
  withDrawLeaves() {
    const modalRef = this.dialog.open(WithDrawLeavesComponent, {
        width: '700px',
        data: { leaves: this.leaves.filter(leave => this.check(leave.date))}
      });
      modalRef.componentInstance.passEntry.subscribe((res) => {
        if(res.isLoading == true) {
          this.isLoading = true;
          const leaveId = res.leaveId;
          this.leaves = this.leaves.filter(leave => leave._id != leaveId);
        }
        else {
            this.isLoading = false;
        }
        });
  }

  withDraw(leaveId: string) {
    this.isLoading = true;
    this.leaveService.withDrawFacultyLeave(leaveId).subscribe(result =>{
        console.log(result);
        this.leaves = this.leaves.filter(leave => leave._id != leaveId);
        this.isLoading = false;
    });
  }

  check(date: string) {
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
