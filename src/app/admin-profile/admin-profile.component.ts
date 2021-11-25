import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../login/login.service';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  user;
  constructor(private authService: LoginService, private dialog: MatDialog) { }
  isLoading = true;
  ngOnInit(): void {
    this.authService.getAdminDetails().subscribe(response => {
      this.user = response.admin;
      this.isLoading = false;
   });
  }
  changePassword() {
    this.dialog.open(ChangePasswordComponent, {
      width: '700px',
      data: { user: this.user, isAdmin: true}
    });
  }
}
