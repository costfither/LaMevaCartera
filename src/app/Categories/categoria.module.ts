import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaListItemComponent } from './categoria-list-item/categoria-list-item.component';
import { CategoriaAddComponent } from './categoria-add/categoria-add.component';



@NgModule({
  declarations: [
    CategoriaListComponent,
    CategoriaListItemComponent,
    CategoriaAddComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CategoriaModule { }
