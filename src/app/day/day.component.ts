import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DayService } from './day.service';
@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  form: FormGroup;
  leaves: any;
  isLoading = false;
  constructor(private dayService: DayService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'date': new FormControl(null,[Validators.required])
    });
  }

  check() {
    this.isLoading = true;
    console.log(this.form.value.date.getDate() + '/' + (this.form.value.date.getMonth()+1) + '/' + this.form.value.date.getFullYear());
    this.dayService.getLeavesOnDay(this.form.value.date.getDate() + '/' + (this.form.value.date.getMonth()+1) + '/' + this.form.value.date.getFullYear()).subscribe(result => {
      this.leaves = result.leaves;
      this.leaves = this.leaves.filter(leaves => leaves.status == 'Accepted');
      this.isLoading = false;
    })
  }


}
