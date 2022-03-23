import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './Auth/guard/authguard.guard';
import { CategoriaAddComponent } from './Categories/categoria-add/categoria-add.component';
import { CategoriaListComponent } from './Categories/categoria-list/categoria-list.component';
import { DataAddComponent } from './data/data-add/data-add.component';
import { DataListComponent } from './data/data-list/data-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'category',
    component: CategoriaListComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'category/add',
    component: CategoriaAddComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'category/:id',
    component: CategoriaAddComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'data',
    component: DataListComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'data/add',
    component: DataAddComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'data/:id',
    component: DataAddComponent,
    canActivate: [AuthguardGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
})
export class AppRoutingModule {}
