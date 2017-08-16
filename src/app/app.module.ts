import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdRadioModule, MdInputModule, MdIconModule, MdCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { NumberComponent } from './number/number.component';
import { GuessComponent } from './guess/guess.component';
import { EntryComponent } from './entry/entry.component';

import { CardService } from './services/card.service';
import { TitlePipe } from './shared/title.pipe';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'number',
    pathMatch: 'full'
  },
  {
    path: 'number',
    component: NumberComponent,
  },
  {
    path: 'number/:id',
    component: GuessComponent
  },
  {
    path: 'entry',
    component: EntryComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    NumberComponent,
    GuessComponent,
    EntryComponent,
    TitlePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MdButtonModule,
    MdRadioModule,
    MdInputModule,
    MdIconModule,
    MdCardModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes),
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
