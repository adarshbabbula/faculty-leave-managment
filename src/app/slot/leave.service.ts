import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Faculty } from '../profile/profile';

@Injectable({ providedIn: 'root' })
export class LeaveService {

  constructor(private http: HttpClient, private router: Router) {}

  getFacultyLeaves(facultyId: string) {
    return this.http.get<{message: string, leaves: any}>(
      'http://localhost:8080/api/leaves/' + facultyId
    );
  }
}
