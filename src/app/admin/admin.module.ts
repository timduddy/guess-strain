import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  MdMenuModule,
  MdSidenavModule,
  MdToolbarModule,
  MdListModule,
  MdButtonModule,
  MdInputModule,
  MdCardModule,
  MdProgressBarModule,
  MdIconModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdminComponent } from './admin.component';
import { EntriesComponent } from './entries/entries.component';
import { CardsComponent } from './cards/cards.component';
import { EditComponent } from './cards/edit/edit.component';
import { UsersComponent } from './users/users.component';

import { SearchPipe } from '../shared/search.pipe';
import { AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'entries', pathMatch: 'full' },
      { path: 'entries', component: EntriesComponent, data: { title: 'Entries' } },
      { path: 'cards', component: CardsComponent, data: { title: 'Cards' } },
      { path: 'cards/:id', component: EditComponent, data: { title: `Card` } },
      { path: 'users', component: UsersComponent, data: { title: 'Users' } },
    ]
  },
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MdMenuModule,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdListModule,
    MdProgressBarModule,
    MdIconModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  declarations: [
    AdminComponent,
    EntriesComponent,
    CardsComponent,
    EditComponent,
    UsersComponent,
    SearchPipe
  ],
  providers: [AuthGuard],
  exports: [SearchPipe]
})
export class AdminModule { }
