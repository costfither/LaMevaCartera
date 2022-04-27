import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AuthModule } from '@angular/fire/auth';
import { FirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const userCreds = {
    email: 'arnau.costabella@gmail.com',
    password: 'EsSergent1Afro',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        AuthModule,
      ],
      providers: [UserService, FirestoreModule, AuthModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
      (service = TestBed.inject(UserService));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should logged in', async(() => {
    service.login(userCreds.email, userCreds.password).subscribe((res) => {
      expect(res).toHaveBeenCalled();
    });
  }));
});
