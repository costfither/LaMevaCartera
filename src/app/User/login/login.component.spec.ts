import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp } from '@angular/fire/app';
import { AuthModule } from '@angular/fire/auth';
import { FirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule,
        ReactiveFormsModule,
        RouterTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        AuthModule,
      ],
      declarations: [LoginComponent],
      providers: [provideMockStore({}), FirestoreModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
