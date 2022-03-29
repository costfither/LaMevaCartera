import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CategoriaAddComponent } from './categoria-add/categoria-add.component';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaComponent } from './categoria.component';

@NgModule({
  declarations: [
    CategoriaComponent,
    CategoriaListComponent,
    CategoriaAddComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  providers: [],
})
export class CategoriaModule {}
