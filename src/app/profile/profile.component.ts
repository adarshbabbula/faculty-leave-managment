import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../admin-profile/change-password/change-password.component';
import { LoginService } from '../login/login.service';
import { Faculty } from './profile';
import { ProfileService } from './profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService:ProfileService, private authService: LoginService, private dialog: MatDialog) { }
  isLoading = true;
  faculty: Faculty;
  userId;
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log(this.userId);
    this.profileService.getFaculty(this.userId).subscribe(result => {
       this.isLoading = false;
       this.faculty = result.faculty;
       console.log(this.faculty);
    });
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent, {
      width: '700px',
      data: { user: this.faculty, isAdmin: false}
    });
  }
}
