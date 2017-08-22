import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MdCardModule,
  MdInputModule,
  MdButtonModule,
  MdCheckboxModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../../../environments/environment';
import { CardService } from '../../../services/card.service';
import { UploadService } from '../../../services/upload.service';

import { AddComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComponent ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MdCardModule,
        MdInputModule,
        MdButtonModule,
        MdCheckboxModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
      ],
      providers: [CardService, UploadService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
