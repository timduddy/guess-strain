import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdSidenavModule,
  MdToolbarModule,
  MdButtonModule,
  MdInputModule,
  MdCardModule,
  MdCheckboxModule,
  MdProgressBarModule,
  MdIconModule,
  MdMenuModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../environments/environment';

import { AdminComponent } from './admin.component';

import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';
import { CardService } from '../services/card.service';

class AuthServiceStub {
  public user = Observable.of({
    uid: 1234,
    displayName: 'Example User',
    email: 'user@example.com',
    getToken: () => {
      return new Promise((resolve, reject) => {
        resolve(1234);
      });
    }
  });
}
class ActivatedRouteStub {
}

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MdSidenavModule,
        MdToolbarModule,
        MdButtonModule,
        MdInputModule,
        MdCardModule,
        MdCheckboxModule,
        MdProgressBarModule,
        MdIconModule,
        MdMenuModule,
        FlexLayoutModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
      ],
      declarations: [ AdminComponent ],
      providers: [
        AuthService,
        AuthGuard,
        CardService,
        {provide: AuthService, useClass: AuthServiceStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
