import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as echarts from 'echarts';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() selectedName = '';
  private myChart: any = null;
  dateVal!: Date;
  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
  }
  public InitPipe(s: any): void {
    // console.log(s)
    let views  = s.map((item: { views: any; }) => {
      return item.views;
  });
  let date  = s.map((item: { timestamp: any; }) => {
    let dateString  = item.timestamp.slice(0, -2);
      let formatedString = dateString.slice(0, 4) + '-' + dateString.slice(4, 6) + '-' + dateString.slice(6, 8);
      console.log(formatedString)
      const dateObj = new Date(formatedString);
      this.dateVal = dateObj;
    return formatedString.slice(-2)
    
});
  console.log(date)
    this.myChart = echarts.init((document.getElementById('main')) as any);
     const option = {
      xAxis: {
        type: 'category',
        data: date
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: views,
          type: 'line'
        }
      ]
    };
  
    this.myChart.setOption(option);
  }




  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  changed(e:any){ 
    if (this.range.value.start !== null || this.range.value.start !== null){
      // this.startDate = this.datePipe.transform(this.range.value.end, 'yyyyMMdd')
      console.log(this.datePipe.transform(this.range.value.end, 'yyyyMMdd'))
    }
  }



}
