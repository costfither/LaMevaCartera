import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AuthModule } from '@angular/fire/auth';
import { FirestoreModule } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { environment } from 'src/environments/environment';
import * as CategoriesReducer from '../Categories/reducer';
import * as DataAction from '../data/actions';
import * as DataReducer from '../data/reducer';
import { User } from '../User/models/user.model';
import * as UserReducer from '../User/reducer';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let user: User = {
    UID: '01ORm4Dk26T1GuFM5qNsWpPstW32',
    email: 'arnau.costabella@gmail.com',
  };
  let storeUser: Store<UserReducer.UserState>;
  let storeData: Store<DataReducer.DatasState>;
  let storeCategory: Store<CategoriesReducer.CategoriesState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          transaction: combineReducers(DataReducer.dataReducer),
          category: combineReducers(CategoriesReducer.categoryReducer),
          user: combineReducers(UserReducer.userReducer),
        }),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        AuthModule,
      ],
      declarations: [HomeComponent],
      providers: [provideMockStore({}), FirestoreModule],
    }).compileComponents();
    storeUser = TestBed.get(Store);
    storeData = TestBed.get(Store);
    storeCategory = TestBed.get(Store);

    spyOn(storeUser, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.user = user;
    fixture.detectChanges();
  });

  it('loadData success from subscription', () => {
    //definimos la dependencia del servicio
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to load data when created', () => {
    const action = DataAction.getDatabyUID({ UID: user.UID });
    component.loadData();

    expect(storeData.dispatch).toHaveBeenCalledWith(action);
  });
});
