import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class LeaveService {

  constructor(private http: HttpClient, private router: Router) {}

  getFacultyLeaves(facultyId: string) {
    return this.http.get<{message: string, leaves: any}>(
      'http://localhost:8080/api/leaves/' + facultyId
    );
  }

  withDrawFacultyLeave(leaveId: string) {
    return this.http.delete<{message: string}>(
      'http://localhost:8080/api/leaves/' + leaveId
    );
  }
}
