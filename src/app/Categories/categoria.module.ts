import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaAddComponent } from './categoria-add/categoria-add.component';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaComponent } from './categoria.component';

@NgModule({
  declarations: [
    CategoriaComponent,
    CategoriaListComponent,
    CategoriaAddComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class CategoriaModule {}
