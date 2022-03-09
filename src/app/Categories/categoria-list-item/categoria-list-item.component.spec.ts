import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaListItemComponent } from './categoria-list-item.component';

describe('CategoriaListItemComponent', () => {
  let component: CategoriaListItemComponent;
  let fixture: ComponentFixture<CategoriaListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
