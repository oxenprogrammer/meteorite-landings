import { AppService } from './app.service';
import { MeteotriteDataSource } from './app.datasource';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'meteorite-landings';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  dataSource: MeteotriteDataSource;
  displayedColumns: string[] = ['name', 'id', 'nametype', 'recclass', 'mass', 'fall', 'year', 'latitude', 'longitude'];
  space = ' ';

  constructor(private appService: AppService) {}

  ngOnInit(): void {

    this.dataSource = new MeteotriteDataSource(this.appService);
    this.dataSource.loadMeteotriteData(`lower(name ) like lower("%%")`, 'name', 0, 50);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
            debounceTime(150),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;

                this.loadMeteotriteDataPage();
            })
        )
        .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadMeteotriteDataPage())
    )
    .subscribe();
  }

  loadMeteotriteDataPage() {
    this.dataSource.loadMeteotriteData(
      `lower(name ) like lower("%${this.input.nativeElement.value}%")`,
      'name',
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
