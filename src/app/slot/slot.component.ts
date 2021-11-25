import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import {LeaveService} from './leave.service';
@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {
  private userId;
  constructor(private leaveService:LeaveService, private authService: LoginService) { }

  ngOnInit(): void {
      this.userId = this.authService.getUserId();
      this.leaveService.getFacultyLeaves(this.userId).subscribe(result=> {
        console.log(result.leaves);
      })
  }

}
