import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class OneHourLeaveService {

  constructor(private http: HttpClient, private router: Router) {}

  getFacultyDeatails(userId: string) {
    return this.http.get<{message:string, faculty: any}>('http://localhost:8080/api/faculty/'+userId);
  }

  oneHour(date: string,from: string, to: string, requestee: string, reason: string){
    return this.http.post<{message: string, leave: any}>(
      'http://localhost:8080/api/halfDayLeaves/',{date, requestee, reason, from, to }
    );
  }

  getLeavesOnDate(date: string) {
    return this.http.get<{message: string, leaves: any}>('http://localhost:8080/api/halfDayLeaves/date/'+date);
  }

  acceptLeave(leaveId: string) {
    return this.http.put<{message: string, leave: any}>('http://localhost:8080/api/halfDayLeaves/accept',{leaveId})
  }

  rejectLeave(leaveId: string, reasonForRejection: string) {
    return this.http.put<{message: string, leave: any}>('http://localhost:8080/api/halfDayLeaves/reject',{leaveId, reasonForRejection})
  }
}
