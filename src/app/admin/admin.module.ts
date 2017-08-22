import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
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
  MdCheckboxModule,
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

import { AuthGuard } from '../services/auth-guard.service';
import { UploadService } from '../services/upload.service';
import { AddComponent } from './cards/add/add.component';
import { ProfileComponent } from './profile/profile.component';
import { NewComponent } from './users/new/new.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'entries', pathMatch: 'full' },
      { path: 'entries', component: EntriesComponent, data: { title: 'Entries' } },
      { path: 'cards', component: CardsComponent, data: { title: 'Cards' } },
      { path: 'card/:id', component: EditComponent, data: { title: `Card`, back: true } },
      { path: 'cards/add', component: AddComponent, data: { title: `Add Card`, back: true } },
      { path: 'users', component: UsersComponent, data: { title: 'Users' } },
      { path: 'users/add', component: NewComponent, data: { title: 'New User', back: true } },
      { path: 'profile', component: ProfileComponent, data: {title: 'Profile' } }
    ]
  },
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MdMenuModule,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdInputModule,
    MdCheckboxModule,
    MdCardModule,
    MdListModule,
    MdProgressBarModule,
    MdIconModule,
    FlexLayoutModule,
    // HttpModule,
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
    AddComponent,
    ProfileComponent,
    NewComponent
  ],
  providers: [AuthGuard, UploadService],
  exports: []
})
export class AdminModule { }
