import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DayService } from 'src/app/day/day.service';

@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.css']
})
export class RejectDialogComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, private dayService: DayService) { }
  form: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      'reasonForRejection': new FormControl(null),
      // 'assignee': new FormControl(null)
    });
  }

  close() {
    this.passEntry.emit({reject: false});
    this.dialogRef.close();
  }

  reject(reason) {
    this.passEntry.emit({isLoading:true, reject: true});
    this.dialogRef.close();
    this.dayService.rejectLeave(this.data.leaveId, reason).subscribe(res => {
      console.log(res);
      this.passEntry.emit({isLoading: false,  reject: true});
    });
  }
}
