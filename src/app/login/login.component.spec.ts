import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdProgressBarModule, MdInputModule, MdIconModule, MdCardModule, MdCheckboxModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { CardService } from '../services/card.service';
import { AuthGuard } from '../services/auth-guard.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MdButtonModule, MdProgressBarModule, MdInputModule, MdIconModule, MdCardModule, MdCheckboxModule,
        FlexLayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
      ],
      declarations: [ LoginComponent ],
      providers: [AuthService, CardService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
