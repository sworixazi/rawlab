import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { wikidata } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class WikiservicesService {
  private _url:string = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/de.wikipedia/all-access/user/'
  constructor(private http: HttpClient) { }

  getwiki(name:string, first:any, currentdate:any): Observable<wikidata> {
    return this.http.get<wikidata>(this._url + name +'/daily/'+first + '/' + currentdate)
  }

}
