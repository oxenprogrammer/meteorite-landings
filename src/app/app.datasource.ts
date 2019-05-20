import { AppService } from './app.service';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';


export class MeteotriteDataSource implements DataSource<any> {
  space = ' ';
  private meteotriteDataSubject = new BehaviorSubject<any>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private appService: AppService) {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.meteotriteDataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.meteotriteDataSubject.complete();
    this.loadingSubject.complete();
  }

  loadMeteotriteData(filter = `lower(name ) like lower("%%")` ,sortDirection = 'name', pageIndex = 0, pageSize = 100) {
    this.loadingSubject.next(true);
    this.appService.getData(filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(meteotriteData => this.meteotriteDataSubject.next(meteotriteData));
  }
}

