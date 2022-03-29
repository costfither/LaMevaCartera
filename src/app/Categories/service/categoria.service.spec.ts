import { TestBed } from '@angular/core/testing';
import { provideFirebaseApp } from '@angular/fire/app';
import { FirestoreModule } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { CategoriaService } from './categoria.service';

describe('CategoriaService', () => {
  let service: CategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        FirestoreModule,
      ],
      providers: [CategoriaService, FirestoreModule],
    });
    service = TestBed.inject(CategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
