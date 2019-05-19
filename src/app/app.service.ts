import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class AppService {

  url = environment.serverURL;

  constructor(private http: HttpClient) { }

  getData(filter = '', sortOrder = 'name', pageNumber = 0, pageSize = 100): Observable<any> {
    return this.http.get<any>(this.url, {
      params: new HttpParams()
        .set('name', filter)
        .set('$order', sortOrder)
        .set('$offset', pageNumber.toString())
        .set('$limit', pageSize.toString())
    })
      .pipe(
        tap((data: any) => {
          return of(data);
        })
      );
  }

}
