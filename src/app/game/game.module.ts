import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../environments/environment';

import { GameComponent } from './game.component';
import { NumberComponent } from './number/number.component';
import { GuessComponent } from './guess/guess.component';
import { EntryComponent } from './entry/entry.component';
import { CompleteComponent } from './complete/complete.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdRadioModule, MdInputModule, MdIconModule, MdCardModule, MdCheckboxModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';
import { CardService } from '../services/card.service';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      { path: '', redirectTo: 'number', pathMatch: 'full' },
      { path: 'number', component: NumberComponent },
      { path: 'number/:id', component: GuessComponent },
      { path: 'entry', component: EntryComponent },
      { path: 'thanks', component: CompleteComponent }
    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdRadioModule,
    MdInputModule,
    MdIconModule,
    MdCardModule,
    MdCheckboxModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  declarations: [
    GameComponent,
    NumberComponent,
    GuessComponent,
    EntryComponent,
    CompleteComponent
  ],
  providers: [CardService]
})
export class GameModule { }
