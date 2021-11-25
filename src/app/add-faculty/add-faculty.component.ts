import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { AddFacultyService } from './add-faculty.service';
@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.css']
})
export class AddFacultyComponent implements OnInit {
  form: FormGroup;
  constructor(private addFacultyService: AddFacultyService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'facultyId': new FormControl(null,[Validators.required]),
      'name': new FormControl(null, [Validators.required]),
      'phoneNo': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
    });
  }

  create() {
      this.addFacultyService.createFaculty(this.form.value.facultyId, this.form.value.name, this.form.value.phoneNo, this.form.value.email).subscribe(result => {
          this.openDialog();
      })
  }

  openDialog() {
    this.dialog.open(DialogComponent,{
      disableClose: false,
      data :{'sucess': true}
  });
  }
}
