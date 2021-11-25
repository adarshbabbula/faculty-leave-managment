import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OneHourLeaveService } from 'src/app/one-hour-leave/one-hour-leave.service';

@Component({
  selector: 'app-regect-dialog',
  templateUrl: './regect-dialog.component.html',
  styleUrls: ['./regect-dialog.component.css']
})
export class RegectDialogComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, private oneHourLeaveService: OneHourLeaveService) { }

  ngOnInit(): void {
  }

  close() {
    this.passEntry.emit({reject: false});
    this.dialogRef.close();
  }

  reject(reason) {
    this.passEntry.emit({isLoading:true, reject: true});
    this.dialogRef.close();
    this.oneHourLeaveService.rejectLeave(this.data.leaveId, reason).subscribe(res => {
      console.log(res);
      this.passEntry.emit({isLoading: false,  reject: true});
    });
  }
}
