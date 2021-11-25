import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, private authService: LoginService) { }
  isChecked = false;
  ngOnInit(): void {
    console.log(this.data);
  }

  close() {
    this.dialogRef.close();
  }
  check(currentPassword) {
    if(this.data.user.password == currentPassword)
      this.isChecked = true;
  }
  change(newPassword) {

    if(this.data.isAdmin == true){
    this.authService.changeAdminPassword(newPassword).subscribe(result => {
      console.log(result);
    });
  }
    else {
      this.authService.changeFacultyPassword(newPassword).subscribe(result => {
        console.log(result);
      });
    }
    this.dialogRef.close();
  }
}
