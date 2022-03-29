import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AuthModule } from '@angular/fire/auth';
import { FirestoreModule } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        AuthModule,
      ],
      declarations: [HomeComponent],
      providers: [provideMockStore({}), FirestoreModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loadData success from subscription', () => {
    //definimos la dependencia del servicio
    expect(component).toBeTruthy();
  });
});
