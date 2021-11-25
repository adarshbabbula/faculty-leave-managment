import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaveService } from '../leave.service';

@Component({
  selector: 'app-with-draw-leaves',
  templateUrl: './with-draw-leaves.component.html',
  styleUrls: ['./with-draw-leaves.component.css']
})
export class WithDrawLeavesComponent implements OnInit {
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public leaveService: LeaveService) { }
  leaves;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    this.form = new FormGroup({
      'leaveId': new FormControl(null,[Validators.required]),
    });
    this.leaves = this.data.leaves;
  }

  withDraw() {
    this.passEntry.emit({isLoading:true, leaveId: this.form.value.leaveId});
    this.dialogRef.close();
    this.leaveService.withDrawFacultyLeave(this.form.value.leaveId).subscribe(result =>{
        console.log(result);
        this.passEntry.emit({isLoading: false});
    });
  }
  close(){
    this.dialogRef.close();
  }
}
