import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    // this.loginService.loginAdmin("233","password");
  }

  facultyLogin(facultyId: string, password) {
    this.loginService.login(facultyId, password);
  }

  adminLogin(adminId: string, password: string) {
    this.loginService.loginAdmin(adminId, password);
  }
}
