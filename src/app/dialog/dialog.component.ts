import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public dialog: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) {}
  heading: string;
  detail: string;
  ngOnInit(): void {
    if(this.data.sucess == true){
        this.heading = 'Sucess';
        this.detail = 'The leave request is submited';
    }
    else{
      this.heading = 'Failed';
      this.detail = this.data.reason;
    }
  }

}
