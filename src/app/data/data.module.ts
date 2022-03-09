import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAddComponent } from './data-add/data-add.component';
import { DataListComponent } from './data-list/data-list.component';
import { DataListItemComponent } from './data-list-item/data-list-item.component';



@NgModule({
  declarations: [
    DataAddComponent,
    DataListComponent,
    DataListItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DataModule { }
