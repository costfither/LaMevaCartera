import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataAddComponent } from './data-add/data-add.component';
import { DataListComponent } from './data-list/data-list.component';
import { DataComponent } from './data.component';
@NgModule({
  declarations: [DataAddComponent, DataListComponent, DataComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class DataModule {}
