import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  heading: string;
  detail: string;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.data.sucess == true){
      this.heading = 'Added';
      this.detail= 'Added New Faculty';
  }
  // else{
  //   this.heading = 'Failed';
  //   this.data = 'You have already booked the leave on that day';
  // }
  }
  close() {
    this.dialog.closeAll();
  }
}
