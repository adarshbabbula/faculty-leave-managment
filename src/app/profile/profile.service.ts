import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Faculty } from './profile';

@Injectable({ providedIn: 'root' })
export class ProfileService {

  constructor(private http: HttpClient, private router: Router) {}

  getFaculty(facultyId: string) {
    return this.http.get<{message: string, faculty: Faculty}>(
      'http://localhost:8080/api/faculty/' + facultyId
    );
  }
}
