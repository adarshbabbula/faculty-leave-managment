import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Faculty } from '../profile/profile';


@Injectable({ providedIn: 'root' })
export class AddFacultyService {

  constructor(private http: HttpClient, private router: Router) {}

  createFaculty(facultyId: string, name: string, phoneNo: string, email: string) {
    return this.http.post<{message: string, leave: any}>(
      'http://localhost:8080/api/faculty/',{facultyId, name, phoneNo, email}
    );
  }
}
