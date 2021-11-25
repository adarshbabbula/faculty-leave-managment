import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticated = false;
  private isAdmin = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private isAdminListener = new Subject<boolean>();
  private userId;
  constructor(private http: HttpClient, private router: Router,private dialog: MatDialog) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAdminListener() {
    return this.isAdminListener.asObservable();
  }

  // createUser(email: string, password: string) {
  //   const authData: AuthData = { email: email, password: password };
  //   this.http
  //     .post("http://localhost:3000/api/user/signup", authData)
  //     .subscribe(response => {
  //       console.log(response);
  //     });
  // }

  openDialog() {
    this.dialog.open(DialogComponent,{
      disableClose: true,
      data :{'sucess': false}
  });
  }

  login(faculty_id: string, password) {
    this.http
      .post<{ token: string; expiresIn: number, userId: string, sucess: boolean}>(
        'http://localhost:8080/api/auth/login',{faculty_id, password}
      )
      .subscribe(response => {
        if(!response.sucess) {
            this.openDialog();
            return;
        }
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.isAdmin = false;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          this.isAdminListener.next(false);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId, this.isAdmin);
          this.router.navigate(["/Profile"]);
        }
      });
  }

  loginAdmin(faculty_id: string, password: string) {
    this.http
      .post<{ token: string; expiresIn: number, userId: string, sucess: boolean}>(
        'http://localhost:8080/api/auth/admin/login',{admin_id: faculty_id, password}
      )
      .subscribe(response => {
        if(!response.sucess) {
          this.openDialog();
          return;
        }
        const token = response.token;
        console.log(response);
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.isAdmin = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          this.isAdminListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId, this.isAdmin);
          this.router.navigate(["/Admin/Profile"]);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      // this.isAdminListener.next()
      if(!this.isAdmin)
      this.router.navigate(["/Profile"]);
      else
      this.router.navigate(["/Admin/Profile"]);
    }
  }

  getUserId() {
    console.log(this.userId);
    return this.userId;
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.isAdminListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/Login"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, isAdmin: boolean) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId",userId);
    localStorage.setItem("isAdmin", isAdmin.toString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("isAdmin");
    this.isAdmin = false;
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    this.userId = localStorage.getItem("userId");
    this.isAdmin = (localStorage.getItem("isAdmin")=="true");
    this.isAdminListener.next(this.isAdmin);
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    }
  }

  getAdminDetails() {
    return this.http
    .get<{ message: string, admin: any}>(
      'http://localhost:8080/api/faculty/admin/'+this.userId
    )

  }

  changeAdminPassword(password: string) {
    return this.http
    .put<{ message: string, admin: any}>(
      'http://localhost:8080/api/faculty/admin/password',{userId: this.userId, password}
    )
  }

  changeFacultyPassword(password: string) {
    return this.http
    .put<{ message: string, admin: any}>(
      'http://localhost:8080/api/faculty/password',{userId: this.userId, password}
    )
  }

  changeCurrentDetails(month: string) {
      console.log(month);
      this.http.put<{ message: string, currentDetals: any}>('http://localhost:8080/api/auth/currentDetails',{month}).subscribe(result => console.log(result));
  }

  getCurrentDetails() {
    return this.http.get<{ message: string, currentDetails: any}>('http://localhost:8080/api/auth/currentDetails');
  }

  post() {
    this.http.post<{ message: string, currentDetals: any}>('http://localhost:8080/api/halfDayLeaves/currentDetails',{}).subscribe(result => console.log(result));
  }
}
