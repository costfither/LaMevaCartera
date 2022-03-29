import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp } from '@angular/fire/app';
import { AuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { initializeApp } from 'firebase/app';
import { UserService } from 'src/app/User/services/user.service';
import { environment } from 'src/environments/environment';
import { CategoriaListComponent } from './categoria-list.component';

describe('CategoriaListComponent', () => {
  let component: CategoriaListComponent;
  let fixture: ComponentFixture<CategoriaListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CategoriaListComponent],
      imports: [
        RouterTestingModule,
        StoreModule,
        AuthModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
      ],
      providers: [provideMockStore({}), UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
