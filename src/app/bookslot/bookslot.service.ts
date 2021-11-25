import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Faculty } from '../profile/profile';


@Injectable({ providedIn: 'root' })
export class BookslotService {

  constructor(private http: HttpClient, private router: Router) {}

  bookSlot(date: string, requestee: string, reason: string, type: String) {
    console.log(type);
    return this.http.post<{message: string, leave: any}>(
      'http://localhost:8080/api/leaves/',{date, requestee, reason, type}
    );
  }

  getLeavesOnDate() {
    return this.http.get<{message: string, dates: any}>('http://localhost:8080/api/dates');
  }

  getFacultyDeatails(userId: string) {
    return this.http.get<{message:string, faculty: any}>('http://localhost:8080/api/faculty/'+userId);
  }

  halfDayLeave(date: string, requestee: string, reason: string){
    return this.http.post<{message: string, leave: any}>(
      'http://localhost:8080/api/halfDayLeaves/',{date, requestee, reason}
    );
  }
}
