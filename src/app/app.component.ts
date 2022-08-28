import { Component } from '@angular/core';
import { CellClickedEvent, GridApi } from 'ag-grid-community';
import { IOlympicData, wikidata } from './interfaces/interfaces';
import * as echarts from 'echarts';
import { WikiservicesService } from './services/wikiservices.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentdate = new Date();
  currentdate1 = this.datepipe.transform(this.currentdate, 'yyyyMMdd');
  first = new Date(this.currentdate.getFullYear(), this.currentdate.getMonth(), 1);
  first1 = this.datepipe.transform(this.first, 'yyyyMMdd');
  lastday =new Date(this.currentdate.getFullYear(), this.currentdate.getMonth() + 1, 0);
  lastdate =  this.datepipe.transform(this.lastday, 'yyyyMMdd');
  rowname = ''
  private myChart: any = null;
  dateVal!: Date;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  title = 'rawlab';
  columnDefs = [{ field: "name", sortable: true}, { field: "country", sortable: true }, { field: "profession", sortable: true }];
  
  constructor(private WikiservicesService: WikiservicesService, public datepipe: DatePipe){
  }
  wikidata:wikidata[] = [];
  ngOnInit(){
    // console.log(this.datepipe.transform(this.first, 'yyyyMMdd'))
    // console.log(this.datepipe.transform(this.currentdate, 'yyyyMMdd'))
  }
  rowData = [
    { name: "Tiger King", country: "United States", profession: "Artist" },
    { name: "Albert Einstein", country: "Germany", profession: "Science" },
    { name: "Angela Merkel", country: "Germany", profession: "Politics" },
    { name: "Donald Trump", country: "United States", profession: "Politics" },
    { name: "Tom Brady", country: "United States", profession: "Sports" },
    { name: "Elon Musk", country: "United States", profession: "IT" },
    { name: "Dwayne Johnson", country: "United States", profession: "Artist" },
    { name: "Christiano Ronaldo", country: "Portugal", profession: "Sports" },
  ];
  onRowclicked(e:any){
    // console.log(e.data.name)
    this.rowname = e.data.name.replace(' ', '_')
   if(this.range.value.start !== undefined || null || this.range.value.end !== undefined || null) {
    // console.log("s");
    this.WikiservicesService.getwiki(this.rowname,this.first1, this.currentdate1).subscribe(data => this.InitPipe(data.items));
   }
  
  // console.log(this.first1);
  // console.log(this.lastdate);
  // console.log(this.currentdate1);

  }
  private InitPipe(s: any): void {
    // console.log(s)
    let views  = s.map((item: { views: any; }) => {
      return item.views;
  });
  let date  = s.map((item: { timestamp: any; }) => {
    let dateString  = item.timestamp.slice(0, -2);
      let formatedString = dateString.slice(0, 4) + '-' + dateString.slice(4, 6) + '-' + dateString.slice(6, 8);
      // console.log(formatedString)
      const dateObj = new Date(formatedString);
      this.dateVal = dateObj;
    return formatedString.slice(-2)
});
  // console.log(date)
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
    if (this.range.value.start !== null && this.range.value.end !== null){
      let first = this.datepipe.transform(this.range.value.start, 'yyyyMMdd');
      let last = this.datepipe.transform(this.range.value.end, 'yyyyMMdd')
      // console.log(first)
      // console.log(last)
      // this.startDate = this.datePipe.transform(this.range.value.end, 'yyyyMMdd')
    this.WikiservicesService.getwiki(this.rowname,first,last).subscribe(data => this.InitPipe(data.items));

      

    }
  }




}
