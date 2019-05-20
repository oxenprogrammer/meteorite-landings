import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatFormFieldModule } from '@angular/material';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatInputModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [AppService],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the app service', () => {
    expect(AppService).toBeTruthy();
  });

});

describe('AppService', () => {
  let appService: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AppService]
    });
    appService = TestBed.get(AppService);
  });

  it('should be created', () => {
    expect(appService).toBeTruthy();
  });

  describe('getData', () => {
    it('should return a collection', async(() => {
      const responseData = [
        {
          fall: 'fell',
          geolocation: {
            latitude: '50.755',
            longitude: '6.08333'
          },
          id: '1',
          mass: '21',
          name: 'Aachen',
          nametype: 'Valid',
          recclass: 'L5',
          reclat: '50.775000',
          reclong: '6.083330',
          year: '1880-01-01T00:00:00.000'
        },
        {
          fall: 'found',
          geolocation: {
            latitude: '54.755',
            longitude: '5.08333'
          },
          id: '2',
          mass: '23',
          name: 'hen',
          nametype: 'Valid',
          recclass: 'L6',
          reclat: '54.775000',
          reclong: '5.083330',
          year: '1880-01-01T00:00:00.000'
        },
        {
          fall: 'fell',
          geolocation: {
            latitude: '40.755',
            longitude: '4.08333'
          },
          id: '3',
          mass: '24',
          name: 'Aachenfr',
          nametype: 'Valid',
          recclass: 'L4',
          reclat: '40.775000',
          reclong: '4.083330',
          year: '1880-01-01T00:00:00.000'
        }
      ];

      let response;
      spyOn(appService, 'getData').and.returnValue(of(responseData));
      appService.getData().subscribe(res => {
        response = res;
      });
      expect(response).toEqual(responseData);
    }));
  });
});
