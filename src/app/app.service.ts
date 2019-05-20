import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class AppService {

  url = environment.serverURL;
  space = ' ';

  constructor(private http: HttpClient) { }

  getData(filter = `lower(name ) like lower("%%")`, sortOrder = 'name', pageNumber = 0, pageSize = 50): Observable<any> {
    return this.http.get<any>(this.url, {
      params: new HttpParams()
        .set('$where', filter)
        .set('$order', sortOrder)
        .set('$offset', pageNumber.toString())
        .set('$limit', pageSize.toString())
    })
      .pipe(
        tap((data: any) => {
          console.log('my data', data);
          return of(data);
        })
      );
  }

  countData(count = 'select count(name)'): Observable<any> {
    return this.http.get<any>(this.url, {params: new HttpParams().set('$query', count)})
      .pipe(
        tap((data: any) => {
          console.log('my count', data);
          return of(data);
        })
      );
  }

}
