import { AppService } from './app.service';
import { MeteotriteDataSource } from './app.datasource';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatButton } from '@angular/material';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Meteorite Explorer App';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  @ViewChild('myBtn') myBtn;

  dataSource: MeteotriteDataSource;
  displayedColumns: string[] = ['name', 'id', 'nametype', 'recclass', 'mass', 'fall', 'year', 'latitude', 'longitude'];
  space = ' ';
  length: number;
  searchForm: FormGroup;

  constructor(private appService: AppService, private builder: FormBuilder) {}

  ngOnInit(): void {
    this.getCount();
    this.dataSource = new MeteotriteDataSource(this.appService);
    this.dataSource.loadMeteotriteData(`lower(name ) like lower("%%")`, 'name', 0, 50);

    this.searchForm = this.builder.group({
      searchInput: ''
    });
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // const {searchInput} = this.searchForm.value;

    fromEvent(this.myBtn.nativeElement, 'click')
        .pipe(
            debounceTime(150),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;

                this.loadMeteotriteDataPage();
            })
        )
        .subscribe(value => console.log('ny value', value));

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadMeteotriteDataPage())
    )
    .subscribe();
  }

  loadMeteotriteDataPage() {
    const formValue = this.searchForm.getRawValue();
    console.log('input value', formValue.searchInput);
    this.dataSource.loadMeteotriteData(
      `lower(name ) like lower("%${formValue.searchInput}%")`,
      'name',
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  getCount() {
    this.appService.countData()
      .subscribe((data: any) => {
        data.map((length: any) => {
          this.length = length.count_name;
        });
      });
  }
}
