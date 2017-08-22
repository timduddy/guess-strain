import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MdCardModule,
  MdInputModule,
  MdButtonModule,
  MdIconModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../../environments/environment';
import { CardService } from '../../services/card.service';
import { AuthService } from '../../services/auth.service';
import { UsersComponent } from './users.component';

import { SearchPipe } from '../../shared/search.pipe';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent, SearchPipe ],
      imports: [
        BrowserAnimationsModule,
        HttpModule,
        MdCardModule,
        MdInputModule,
        MdButtonModule,
        RouterTestingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule
      ],
      providers: [CardService, AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
