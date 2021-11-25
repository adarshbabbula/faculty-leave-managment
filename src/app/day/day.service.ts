import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Faculty } from '../profile/profile';


@Injectable({ providedIn: 'root' })
export class DayService {

  constructor(private http: HttpClient, private router: Router) {}

  getLeavesOnDay(date: string) {
    return this.http.get<{message: string, leaves: any}>('http://localhost:8080/api/leaves/date/'+date);
  }

  getFaculty(facultyId: string) {
    return this.http.get<{message: string, faculty: Faculty}>(
      'http://localhost:8080/api/faculty/' + facultyId
    );
  }

  acceptLeaeve(leaveId: string) {
    return this.http.put<{message: string, leave: any}>('http://localhost:8080/api/leaves/accept',{leaveId})
  }

  rejectLeave(leaveId: string, reasonForRejection) {
    return this.http.put<{message: string, leave: any}>('http://localhost:8080/api/leaves/reject',{leaveId, reasonForRejection})
  }

  getDateDetails(date: string) {
    return this.http.get<{message: string, date: any}>('http://localhost:8080/api/dates/'+date);
  }
}
