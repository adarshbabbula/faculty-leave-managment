import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { LoginService } from '../login/login.service';
import { BookslotService } from './bookslot.service';
@Component({
  selector: 'app-bookslot',
  templateUrl: './bookslot.component.html',
  styleUrls: ['./bookslot.component.css']
})
export class BookslotComponent implements OnInit {
  form: FormGroup;
  minDate = new Date();
  constructor(private bookSlotService: BookslotService, private authService: LoginService, private dialog: MatDialog) { }
  private dates;
  private userId;
  isLoading = false;
  ngOnInit(): void {
    this.form = new FormGroup({
      'date': new FormControl(null,[Validators.required]),
      'reason': new FormControl(null, [Validators.required]),
      // 'endingDate': new FormControl(null, [Validators.required]),
      'type': new FormControl(null,[Validators.required])
    });
    this.bookSlotService.getLeavesOnDate().subscribe(result => {
      this.dates = result.dates;
    });
    this.userId = this.authService.getUserId();
  }
  bookSlot() {
    const date = this.dates.find(dates => dates.date === this.form.value.date.getDate() + '/' + (this.form.value.date.getMonth()+1) + '/' + this.form.value.date.getFullYear());
    console.log(date);
    if(date) {
      if(date.acceptedLeaves == 7) {
        this.openDialog(false, 'No of leaves exceeded');
        return;
      }
    }
    this.isLoading = true;
    this.bookSlotService.getFacultyDeatails(this.userId).subscribe(result => {
      const facutlyLeaves = result.faculty.leaves;
      if((facutlyLeaves.findIndex(element => element == this.form.value.date.getDate() + '/' + (this.form.value.date.getMonth()+1) + '/' + this.form.value.date.getFullYear())==-1)) {
        console.log(this.form.value.date.getDate() + '/' + (this.form.value.date.getMonth()+1) + '/' + this.form.value.date.getFullYear());
        console.log(facutlyLeaves);
        this.bookSlotService.bookSlot(this.form.value.date.getDate() + '/' + (this.form.value.date.getMonth()+1) + '/' + this.form.value.date.getFullYear(), this.userId ,this.form.value.reason, this.form.value.type).subscribe(result => {
          this.openDialog(true, '');
          this.isLoading = false;
        })
      }
      else {
        this.openDialog(false, 'You have already booked the leave on that day');
        this.isLoading = false;
      }
  });
  }

  // halfDayLeave() {
  //     this.bookSlotService.halfDayLeave('23/10/2021',this.userId, 'hhh').subscribe(result => {
  //       console.log(result);
  //     })
  // }

  openDialog(sucess: boolean, reason: string) {
    this.dialog.open(DialogComponent,{
      disableClose: true,
      data :{'sucess': sucess, reason: reason}
  });
  }
}
