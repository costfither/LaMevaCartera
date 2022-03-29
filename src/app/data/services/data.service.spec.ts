import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        FirestoreModule,
      ],
      providers: [DataService, FirestoreModule],
    });
    service = TestBed.inject(DataService);
  });

  //instancies necesaries per cada test del servei
  beforeEach(() => {
    service = TestBed.inject(DataService);
  });

  //despres de cada test
  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
