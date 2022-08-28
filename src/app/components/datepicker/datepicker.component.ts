import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  // range = new FormGroup({
  //   start: new FormControl<Date | null>(null),
  //   end: new FormControl<Date | null>(null),
  // });
  // changed(e:any){ 
  //   if (this.range.value.start !== null || this.range.value.start !== null){
  //     // this.startDate = this.datePipe.transform(this.range.value.end, 'yyyyMMdd')
  //     console.log(this.datePipe.transform(this.range.value.end, 'yyyyMMdd'))
  //   }
  // }
  constructor(private datePipe: DatePipe) {
  }
  ngOnInit(): void {
  }

}
