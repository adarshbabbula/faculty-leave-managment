import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'leave-managment';
  isAuthenticated;
  isAdmin;
  constructor(private authService: LoginService){
      this.authService.autoAuthUser();
      this.isAuthenticated = this.authService.getIsAuth();
      this.isAdmin = this.authService.getIsAdmin();
      this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
          this.isAuthenticated = isAuthenticated;
          console.log(this.isAuthenticated);
      });
      this.authService.getIsAdminListener().subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      });
      this.authService.getCurrentDetails().subscribe(result => {
        const date = new Date();
        console.log(result);
        if(result.currentDetails.month != date.getMonth().toString()) {
          this.authService.changeCurrentDetails(date.getMonth().toString());
        }
        else{
          console.log(result.currentDetails.month);
        }
      })
  }
  logout() {
    this.authService.logout();
  }

}
